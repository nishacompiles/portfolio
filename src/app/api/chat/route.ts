import { NextResponse } from "next/server";
import { chatbotConfig } from "@/data/chatbot";
import {
  generateReply,
  isChatConfigured,
  type ChatHistoryItem,
} from "@/lib/openai";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Hard cap on the raw request body, well above realistic chat histories. */
const MAX_BODY_CHARS = 200_000;

interface IncomingMessage {
  role?: unknown;
  content?: unknown;
}

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

/**
 * Validates, rate-limits and answers a chat request.
 *
 * Security notes:
 * - The OpenAI key and system prompt only ever exist server-side.
 * - Client-supplied `system`/`developer` messages are stripped; the assistant
 *   prompt is authoritative and can never be overridden from the client.
 * - Errors returned to the client are generic; details are logged server-side.
 */
export async function POST(request: Request) {
  const clientIp = getClientIp(request);

  const limited = rateLimit(
    `chat:${clientIp}`,
    chatbotConfig.rateLimit.maxRequests,
    chatbotConfig.rateLimit.windowMs,
  );
  if (!limited.ok) {
    return NextResponse.json(
      { error: chatbotConfig.errorMessages.rateLimited },
      {
        status: 429,
        headers: { "Retry-After": String(limited.retryAfterSeconds) },
      },
    );
  }

  const rawBody = await request.text();
  if (rawBody.length === 0) {
    return NextResponse.json(
      { error: chatbotConfig.errorMessages.emptyMessage },
      { status: 400 },
    );
  }
  if (rawBody.length > MAX_BODY_CHARS) {
    return NextResponse.json(
      { error: chatbotConfig.errorMessages.invalidRequest },
      { status: 413 },
    );
  }

  let parsed: { messages?: unknown };
  try {
    parsed = JSON.parse(rawBody) as { messages?: unknown };
  } catch {
    return NextResponse.json(
      { error: chatbotConfig.errorMessages.invalidRequest },
      { status: 400 },
    );
  }

  if (!Array.isArray(parsed.messages)) {
    return NextResponse.json(
      { error: chatbotConfig.errorMessages.invalidRequest },
      { status: 400 },
    );
  }

  // Normalize and validate incoming messages, discarding anything unsafe.
  const normalized: ChatHistoryItem[] = [];
  for (const message of parsed.messages.slice(0, chatbotConfig.maxMessagesPerRequest) as IncomingMessage[]) {
    if (typeof message !== "object" || message === null) continue;

    const role = message.role;
    if (role !== "user" && role !== "assistant") continue;

    const content = typeof message.content === "string" ? message.content.trim() : "";
    if (content.length === 0) continue;
    if (content.length > chatbotConfig.maxMessageLength) {
      return NextResponse.json(
        { error: chatbotConfig.errorMessages.invalidRequest },
        { status: 400 },
      );
    }

    normalized.push({ role, content });
  }

  if (normalized.length === 0) {
    return NextResponse.json(
      { error: chatbotConfig.errorMessages.emptyMessage },
      { status: 400 },
    );
  }

  // The conversation must start and end with a user message; otherwise the
  // model could see a dangling assistant reply or attach to injected roles.
  if (normalized[0].role !== "user") {
    normalized.shift();
    if (normalized.length === 0) {
      return NextResponse.json(
        { error: chatbotConfig.errorMessages.invalidRequest },
        { status: 400 },
      );
    }
  }
  while (normalized[normalized.length - 1].role !== "user") {
    normalized.pop();
  }

  if (!isChatConfigured()) {
    return NextResponse.json(
      { error: chatbotConfig.errorMessages.notConfigured },
      { status: 503 },
    );
  }

  // Keep cost predictable: send only the most recent turns.
  const trimmed = normalized.slice(-chatbotConfig.maxHistoryTurns);

  try {
    const reply = await generateReply(trimmed);
    return NextResponse.json({ reply });
  } catch (error) {
    console.error("[api/chat] assistant request failed", {
      ip: clientIp,
      model: process.env.OPENAI_MODEL || chatbotConfig.defaultModel,
      error: error instanceof Error ? error.message : "unknown error",
    });
    return NextResponse.json(
      { error: chatbotConfig.errorMessages.generic },
      { status: 503 },
    );
  }
}