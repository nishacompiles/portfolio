import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import Reveal from "./Reveal";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "left";
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <Reveal>
          <p className="inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.22em] text-accent-deep">
            <span aria-hidden className="h-px w-6 bg-accent" />
            {eyebrow}
            {align === "center" && (
              <span aria-hidden className="h-px w-6 bg-accent" />
            )}
          </p>
        </Reveal>
      ) : null}
      <Reveal delay={0.08}>
        <h2 className="mt-4 text-balance font-display text-3xl leading-tight tracking-tight text-ink sm:text-[2.5rem]">
          {title}
        </h2>
      </Reveal>
      {description ? (
        <Reveal delay={0.16}>
          <p className="mt-4 text-base leading-relaxed text-ink-soft sm:text-lg">
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}