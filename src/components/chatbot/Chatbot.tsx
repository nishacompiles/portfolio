"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useState } from "react";

import ChatWindow from "@/components/chatbot/ChatWindow";
import { chatUI } from "@/data/chatbot-ui";

export interface ChatMessageItem {
  id: string;
  role: "user" | "assistant";
  content: string;
  /** Error bubbles render with an error style and a retry action. */
  status?: "error";
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessageItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUserMessage, setLastUserMessage] = useState<ChatMessageItem | null>(null);
  const reduceMotion = useReducedMotion();

  const send = async (text: string) => {
    const content = text.trim();
    if (!content || isLoading) return;

    // Remove any previous error bubble so a successful retry reads cleanly.
    const base = messages.filter((message) => message.status !== "error");
    const userMessage: ChatMessageItem = {
      id: crypto.randomUUID(),
      role: "user",
      content,
    };

    setMessages([...base, userMessage]);
    setLastUserMessage(userMessage);
    setIsLoading(true);

    try {
      const history = [...base, userMessage]
        .slice(-16)
        .map(({ role, content: body }) => ({ role, content: body }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });

      const data = (await response.json().catch(() => null)) as
        | { reply?: unknown; error?: unknown }
        | null;

      if (response.ok && data && typeof data.reply === "string") {
        const reply: string = data.reply;
        setMessages((prev) => [
          ...prev,
          { id: crypto.randomUUID(), role: "assistant", content: reply },
        ]);
      } else {
        const errorText =
          data && typeof data.error === "string"
            ? data.error
            : chatUI.networkErrorFallback;
        setMessages((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            role: "assistant",
            content: errorText,
            status: "error",
          },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: chatUI.networkErrorFallback,
          status: "error",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const retry = async () => {
    if (!lastUserMessage || isLoading) return;
    await send(lastUserMessage.content);
  };

  /** Close the chat and smooth-scroll to a portfolio section. */
  const navigate = (target: string) => {
    setOpen(false);
    requestAnimationFrame(() => {
      document
        .getElementById(target)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <>
      <AnimatePresence>
        {open ? (
          <motion.div
            key="chatbot-window"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-3 right-3 z-[60] sm:bottom-5 sm:right-5"
          >
            <ChatWindow
              messages={messages}
              isLoading={isLoading}
              onSend={send}
              onRetry={retry}
              onClose={() => setOpen(false)}
              onNavigate={navigate}
            />
          </motion.div>
        ) : (
          <motion.button
            key="chatbot-launcher"
            type="button"
            onClick={() => setOpen(true)}
            aria-haspopup="dialog"
            aria-label={chatUI.labels.fab}
            initial={false}
            animate={reduceMotion ? undefined : { scale: [1, 1.04, 1] }}
            transition={
              reduceMotion
                ? undefined
                : { duration: 3.5, repeat: Infinity, ease: "easeInOut" }
            }
            whileHover={{ y: -3, scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            className="group fixed bottom-3 right-3 z-[60] grid size-14 place-items-center rounded-full bg-accent-dark text-white shadow-lift ring-1 ring-white/25 transition-colors duration-200 hover:bg-accent-hover sm:bottom-5 sm:right-5"
          >
            <Sparkles className="size-6" aria-hidden="true" />
            <span className="pointer-events-none absolute right-full top-1/2 mr-3 hidden -translate-y-1/2 whitespace-nowrap rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-medium text-ink opacity-0 shadow-soft transition-opacity duration-200 group-hover:opacity-100 sm:block">
              {chatUI.labels.fab}
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}