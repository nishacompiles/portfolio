"use client";

import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { FormEvent, KeyboardEvent, RefObject, useState } from "react";

import { chatUI } from "@/data/chatbot-ui";

interface ChatInputProps {
  onSubmit: (text: string) => void;
  disabled: boolean;
  inputRef: RefObject<HTMLTextAreaElement | null>;
}

const MAX_HEIGHT = 120;

export default function ChatInput({ onSubmit, disabled, inputRef }: ChatInputProps) {
  const [value, setValue] = useState("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const text = value.trim();
    if (!text || disabled) return;
    onSubmit(text);
    setValue("");
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit(event);
    }
  };

  const resize = () => {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, MAX_HEIGHT)}px`;
  };

  return (
    <div>
      <p className="mb-2 px-1 text-[11px] font-medium text-ink-faint">
        {chatUI.inputHint}
      </p>
      <form onSubmit={handleSubmit} className="flex items-end gap-2">
        <label className="sr-only" htmlFor="chatbot-input">
          {chatUI.labels.input}
        </label>
        <textarea
          id="chatbot-input"
          ref={inputRef}
          rows={1}
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
            resize();
          }}
          onKeyDown={handleKeyDown}
          onInput={resize}
          placeholder={chatUI.inputPlaceholder}
          aria-label={chatUI.labels.input}
          disabled={disabled}
          className="max-h-[120px] min-h-10 flex-1 resize-none rounded-xl border border-line-strong bg-surface px-3.5 py-2 text-sm text-ink placeholder:text-ink-faint focus:border-accent disabled:opacity-50"
        />
        <motion.button
          type="submit"
          disabled={disabled || value.trim().length === 0}
          aria-label={chatUI.labels.send}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.92 }}
          className="grid size-10 shrink-0 place-items-center rounded-full bg-accent-dark text-white shadow-soft transition-colors duration-200 hover:bg-accent-hover disabled:pointer-events-none disabled:opacity-45"
        >
          <Send className="size-4" aria-hidden="true" />
        </motion.button>
      </form>
    </div>
  );
}