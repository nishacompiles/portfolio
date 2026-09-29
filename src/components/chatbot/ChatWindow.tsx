"use client";

import { Minus, X } from "lucide-react";
import { useEffect, useRef } from "react";

import type { ChatMessageItem } from "@/components/chatbot/Chatbot";
import ChatInput from "@/components/chatbot/ChatInput";
import ChatMessage from "@/components/chatbot/ChatMessage";
import ExploreNav from "@/components/chatbot/ExploreNav";
import NishAvatar from "@/components/chatbot/NishAvatar";
import SuggestedQuestions from "@/components/chatbot/SuggestedQuestions";
import TypingIndicator from "@/components/chatbot/TypingIndicator";
import { chatUI } from "@/data/chatbot-ui";

interface ChatWindowProps {
  messages: ChatMessageItem[];
  isLoading: boolean;
  onSend: (text: string) => void;
  onRetry: () => void;
  onClose: () => void;
  onNavigate: (target: string) => void;
}

const iconButton =
  "grid size-8 shrink-0 place-items-center rounded-full text-ink-faint transition-colors duration-200 hover:bg-surface-soft hover:text-ink";

export default function ChatWindow({
  messages,
  isLoading,
  onSend,
  onRetry,
  onClose,
  onNavigate,
}: ChatWindowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isLoading]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const isEmpty = messages.length === 0;

  return (
    <div
      id="chatbot-window"
      role="dialog"
      aria-label={chatUI.headerTitle}
      className="flex h-[calc(100dvh-4rem)] min-h-[24rem] w-[calc(100vw-2rem)] max-w-[26rem] flex-col overflow-hidden rounded-[1.5rem] border border-line bg-surface shadow-lift sm:h-[min(68vh,31rem)] sm:min-h-0 sm:w-[26rem]"
    >
      <header className="flex items-center gap-3 border-b border-line px-4 py-3">
        <NishAvatar size={36} />

        <div className="min-w-0 flex-1">
          <p className="truncate text-[15px] font-semibold tracking-tight text-ink">
            {chatUI.headerTitle}
          </p>
          <p className="truncate text-xs text-ink-faint">{chatUI.headerSubtitle}</p>
        </div>

        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-surface-soft px-2.5 py-1 text-[10px] font-medium text-ink-soft">
          <span className="size-1.5 rounded-full bg-success" aria-hidden="true" />
          {chatUI.labels.online}
        </span>

        <button
          type="button"
          onClick={onClose}
          className={iconButton}
          aria-label={chatUI.labels.minimize}
          title={chatUI.labels.minimize}
        >
          <Minus className="size-4" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={onClose}
          className={iconButton}
          aria-label={chatUI.labels.close}
          title={chatUI.labels.close}
        >
          <X className="size-4" aria-hidden="true" />
        </button>
      </header>

      <div ref={scrollRef} className="flex-1 overflow-y-auto overscroll-contain">
        <div
          role="log"
          aria-live="polite"
          aria-relevant="additions"
          className="space-y-3 px-4 py-4"
        >
          {isEmpty && (
            <ChatMessage
              message={{
                id: "welcome",
                role: "assistant",
                content: chatUI.welcomeMessage,
              }}
            />
          )}
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} onRetry={onRetry} />
          ))}
          {isLoading && <TypingIndicator />}
          <div ref={bottomRef} />
        </div>

        {isEmpty && (
          <div className="px-4 pb-4 sm:px-4">
            <div className="border-t border-line" />
            <SuggestedQuestions onSelect={onSend} />
            <ExploreNav onNavigate={onNavigate} />
          </div>
        )}
      </div>

      <div className="border-t border-line p-3">
        <ChatInput onSubmit={onSend} disabled={isLoading} inputRef={inputRef} />
      </div>
    </div>
  );
}