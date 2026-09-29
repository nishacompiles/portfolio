"use client";

import { Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";

interface NishAvatarProps {
  /** Pixel size of the circular avatar. */
  size?: number;
  className?: string;
}

/**
 * Minimal, non-human avatar for the Nish01 assistant:
 * a small circular badge with a sparkle symbol, always the same everywhere.
 */
export default function NishAvatar({ size = 24, className }: NishAvatarProps) {
  const iconClass = size <= 28 ? "size-3.5" : "size-5";

  return (
    <span
      className={cn(
        "grid shrink-0 place-items-center rounded-full bg-accent-soft text-accent-foreground",
        className,
      )}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <Sparkles className={iconClass} />
    </span>
  );
}