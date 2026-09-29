"use client";

import { chatUI } from "@/data/chatbot-ui";

interface SuggestedQuestionsProps {
  onSelect: (question: string) => void;
}

/**
 * Welcome-state suggestion chips. Each chip sends its predefined question
 * to the assistant when clicked.
 */
export default function SuggestedQuestions({ onSelect }: SuggestedQuestionsProps) {
  return (
    <div className="mt-5">
      <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-faint">
        {chatUI.exploreWorkHeading}
      </p>
      <div className="flex flex-col gap-2">
        {chatUI.suggestionChips.map((chip) => (
          <button
            key={chip.label}
            type="button"
            onClick={() => onSelect(chip.question)}
            className="flex items-center rounded-xl border border-line bg-surface px-3.5 py-2 text-left text-sm font-medium text-ink-soft transition-colors duration-200 hover:border-accent hover:bg-accent-softer hover:text-accent-foreground"
          >
            <span className="truncate">{chip.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}