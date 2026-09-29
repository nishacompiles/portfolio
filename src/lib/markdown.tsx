/**
 * Minimal, dependency-free Markdown renderer for assistant replies.
 *
 * Renders React elements directly — never uses `dangerouslySetInnerHTML` — so
 * model output can never inject raw HTML. Supports the subset the system prompt
 * asks for: **bold**, *italic*, `inline code`, fenced code blocks, bullet and
 * numbered lists, and safe (http/https/mailto) links.
 */

import { Fragment, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const INLINE_TOKEN =
  /(\*\*[^*]+?\*\*|\*[^*]+?\*|`[^`]+`|\[[^\]\n]+\]\([^)\n]+\))/g;
const LINK_PATTERN = /^\[([^\]\n]+)\]\(([^)\n]+)\)$/;

function sanitizeHref(href: string): string | null {
  if (/^(https?:\/\/|mailto:)/i.test(href)) {
    return href;
  }
  return null;
}

function renderInline(text: string, keyPrefix: string): ReactNode {
  const parts = text.split(INLINE_TOKEN);

  return parts.map((part, index) => {
    if (!part) return null;

    const key = `${keyPrefix}-${index}`;

    if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
      return <strong key={key}>{part.slice(2, -2)}</strong>;
    }

    if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
      return <em key={key}>{part.slice(1, -1)}</em>;
    }

    if (part.startsWith("`") && part.endsWith("`") && part.length > 2) {
      return (
        <code
          key={key}
          className="rounded-md bg-canvas px-1.5 py-0.5 font-mono text-[0.85em] text-ink"
        >
          {part.slice(1, -1)}
        </code>
      );
    }

    const link = LINK_PATTERN.exec(part);
    if (link) {
      const [, label, href] = link;
      const safeHref = sanitizeHref(href);
      if (safeHref) {
        return (
          <a
            key={key}
            href={safeHref}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-accent-soft underline-offset-2 text-accent-foreground hover:text-accent"
          >
            {label}
          </a>
        );
      }
      return <Fragment key={key}>{label}</Fragment>;
    }

    return <Fragment key={key}>{part}</Fragment>;
  });
}

function Block({ raw, index }: { raw: string; index: number }) {
  const trimmed = raw.trim();
  const lines = trimmed.split("\n").map((line) => line.trim());

  if (trimmed.startsWith("```")) {
    const code = lines
      .slice(1, lines[lines.length - 1] === "```" ? -1 : undefined)
      .join("\n");
    return (
      <pre className="overflow-x-auto rounded-xl border border-line bg-canvas p-3 font-mono text-[0.85em] leading-relaxed text-ink">
        <code>{code}</code>
      </pre>
    );
  }

  const bulletLines = lines.filter((line) => line.length > 0);
  const allBullets =
    bulletLines.length > 0 && bulletLines.every((line) => /^[-*]\s+/.test(line));
  if (allBullets) {
    return (
      <ul className="space-y-1.5 pl-5">
        {bulletLines.map((line, i) => (
          <li key={i} className="list-disc marker:text-accent">
            {renderInline(line.replace(/^[-*]\s+/, ""), `li-${index}-${i}`)}
          </li>
        ))}
      </ul>
    );
  }

  const allOrdered =
    bulletLines.length > 0 &&
    bulletLines.every((line) => /^\d+\.\s+/.test(line));
  if (allOrdered) {
    return (
      <ol className="space-y-1.5 pl-5">
        {bulletLines.map((line, i) => (
          <li key={i} className="list-decimal marker:text-accent">
            {renderInline(line.replace(/^\d+\.\s+/, ""), `ol-${index}-${i}`)}
          </li>
        ))}
      </ol>
    );
  }

  const heading = /^(#{1,3})\s+(.+)$/.exec(trimmed);
  if (heading) {
    const level = heading[1].length;
    const content = renderInline(heading[2], `h-${index}`);
    if (level === 1) {
      return <h3 className="font-display text-lg font-semibold text-ink">{content}</h3>;
    }
    if (level === 2) {
      return <h4 className="font-display text-base font-semibold text-ink">{content}</h4>;
    }
    return <p className="font-medium text-ink">{content}</p>;
  }

  return <p>{renderInline(lines.join(" "), `p-${index}`)}</p>;
}

export function Markdown({ content, className }: { content: string; className?: string }) {
  const blocks = content
    .trim()
    .split(/\n{2,}/)
    .filter((block) => block.trim().length > 0);

  return (
    <div className={cn("space-y-2.5", className)}>
      {blocks.map((block, index) => (
        <Block key={index} raw={block} index={index} />
      ))}
    </div>
  );
}