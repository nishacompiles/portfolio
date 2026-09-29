"use client";

import { chatUI } from "@/data/chatbot-ui";

interface ExploreNavProps {
  /** Called with a portfolio section id (e.g. "projects"). */
  onNavigate: (target: string) => void;
}

/**
 * Small quick-navigation row shown in the welcome state. Clicking an item
 * scrolls the page to the matching portfolio section (the chat closes).
 */
export default function ExploreNav({ onNavigate }: ExploreNavProps) {
  return (
    <div className="mt-5 border-t border-line pt-4">
      <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-faint">
        {chatUI.exploreNavHeading}
      </p>
      <div className="flex flex-wrap gap-2">
        {chatUI.exploreNavItems.map((item) => (
          <button
            key={item.target}
            type="button"
            onClick={() => onNavigate(item.target)}
            className="rounded-lg border border-line bg-surface px-3 py-1.5 text-xs font-medium text-ink-soft transition-colors duration-200 hover:border-accent hover:bg-accent-softer hover:text-accent-foreground"
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}