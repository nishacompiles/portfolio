import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface BadgeProps {
  children: ReactNode;
  tone?: "neutral" | "accent" | "sky";
  className?: string;
}

const tones = {
  neutral: "border border-line bg-surface-soft text-ink-soft",
  accent: "border border-accent/20 bg-accent-soft text-accent-foreground",
  sky: "border border-sky/25 bg-sky-soft text-sky-deep",
};

export default function Badge({
  children,
  tone = "neutral",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium sm:text-[13px]",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}