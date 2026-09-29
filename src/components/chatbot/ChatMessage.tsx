"use client";

import { motion } from "framer-motion";
import { RotateCcw } from "lucide-react";

import type { ChatMessageItem } from "@/components/chatbot/Chatbot";
import NishAvatar from "@/components/chatbot/NishAvatar";
import { chatUI } from "@/data/chatbot-ui";
import { cn } from "@/lib/utils";
import { Markdown } from "@/lib/markdown";

interface ChatMessageProps {
  message: ChatMessageItem;
  onRetry?: () => void;
}

export default function ChatMessage({ message, onRetry }: ChatMessageProps) {
  const isUser = message.role === "user";
  const isError = message.status === "error";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className={cn(
        "flex items-end gap-2",
        isUser ? "justify-end" : "justify-start",
      )}
    >
      {!isUser && (
        <NishAvatar size={24} className="mb-0.5" />
      )}

      <div
        className={cn(
          "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
          isUser
            ? "rounded-br-md bg-accent-dark text-white shadow-soft"
            : isError
              ? "rounded-bl-md border border-error bg-error-soft text-ink"
              : "rounded-bl-md border border-line bg-surface-soft text-ink",
        )}
      >
        {isError ? (
          <div className="space-y-2.5">
            <p>{message.content}</p>
            <button
              type="button"
              onClick={onRetry}
              aria-disabled={!onRetry}
              disabled={!onRetry}
              className="inline-flex items-center gap-1.5 rounded-full border border-line-strong bg-surface px-3 py-1 text-xs font-semibold text-accent-foreground transition-colors duration-200 hover:border-accent"
            >
              <RotateCcw className="size-3" aria-hidden="true" />
              {chatUI.labels.retry}
            </button>
          </div>
        ) : (
          <Markdown content={message.content} />
        )}
      </div>
    </motion.div>
  );
}