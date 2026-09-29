/**
 * Server-only OpenAI integration for the AI portfolio assistant.
 *
 * This module must never be imported from client components. It relies on
 * server-side environment variables and is bundled with the Node.js runtime
 * only (see next.config.ts `serverExternalPackages: ["openai"]`).
 */

import OpenAI from "openai";
import type { ResponseInput } from "openai/resources/responses/responses";
import { chatbotConfig, SYSTEM_PROMPT } from "@/data/chatbot";

export interface ChatHistoryItem {
  role: "user" | "assistant";
  content: string;
}

/** True when the assistant has been configured for use. */
export function isChatConfigured(): boolean {
  return Boolean(process.env.OPENAI_API_KEY);
}

/** Model used by the assistant; configurable via OPENAI_MODEL. */
export function getChatModel(): string {
  const model = process.env.OPENAI_MODEL?.trim();
  return model || chatbotConfig.defaultModel;
}

/**
 * Optional OpenAI-compatible base URL (e.g. Google AI Studio's free Gemini
 * endpoint: https://generativelanguage.googleapis.com/v1beta/openai/).
 * When set, the assistant talks to that provider via the chat-completions API
 * instead of OpenAI's Responses API.
 */
function getChatBaseUrl(): string | undefined {
  return process.env.OPENAI_BASE_URL?.trim() || undefined;
}

/**
 * Generate a reply using OpenAI's Responses API, or an OpenAI-compatible
 * provider (via OPENAI_BASE_URL) using chat completions.
 *
 * The conversation history and the portfolio system prompt are applied
 * server-side; the client can never override them.
 *
 * Throws on failure — the caller (route handler) converts errors into safe,
 * user-facing messages. Never exposes the system prompt or the API key.
 */
export async function generateReply(history: ChatHistoryItem[]): Promise<string> {
  const client = new OpenAI({
    baseURL: getChatBaseUrl(),
    timeout: 45_000,
    maxRetries: 1,
  });

  const model = getChatModel();
  const baseUrl = getChatBaseUrl();
  const temperature = 0.7;

  let text: string | undefined;

  if (baseUrl) {
    const response = await client.chat.completions.create({
      model,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...history,
      ],
      temperature,
      max_tokens: chatbotConfig.maxOutputTokens,
    });
    text = response.choices[0]?.message?.content?.trim() || undefined;
  } else {
    const input: ResponseInput = history.map((message) => ({
      role: message.role,
      content: message.content,
    }));

    const response = await client.responses.create({
      model,
      instructions: SYSTEM_PROMPT,
      input,
      temperature,
      max_output_tokens: chatbotConfig.maxOutputTokens,
    });
    text = response.output_text?.trim();
  }

  if (!text) {
    throw new Error("Assistant returned an empty response");
  }

  return text;
}