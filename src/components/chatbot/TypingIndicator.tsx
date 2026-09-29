"use client";

import NishAvatar from "@/components/chatbot/NishAvatar";
import { chatUI } from "@/data/chatbot-ui";

export default function TypingIndicator() {
  return (
    <div
      className="flex items-end gap-2"
      role="status"
      aria-label={chatUI.labels.typing}
    >
      <NishAvatar size={24} className="mb-0.5" />
      <div className="rounded-bl-md rounded-2xl border border-line bg-surface-soft px-4 py-3">
        <div className="flex items-center gap-1.5">
          <span className="typing-dot size-1.5 rounded-full bg-accent-foreground" />
          <span
            className="typing-dot size-1.5 rounded-full bg-accent-foreground"
            style={{ animationDelay: "0.15s" }}
          />
          <span
            className="typing-dot size-1.5 rounded-full bg-accent-foreground"
            style={{ animationDelay: "0.3s" }}
          />
        </div>
      </div>
    </div>
  );
}