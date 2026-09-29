"use client";

import type { MouseEventHandler, ReactNode } from "react";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps {
  href?: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  disabled?: boolean;
  ariaLabel?: string;
  newTab?: boolean;
  download?: boolean;
  onClick?: MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
}

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold tracking-tight transition-colors duration-200 disabled:pointer-events-none disabled:opacity-45";

const variants: Record<Variant, string> = {
  primary: "bg-accent-dark text-white shadow-soft hover:bg-accent-hover",
  outline:
    "border border-line-strong bg-surface text-ink hover:border-accent hover:text-accent-foreground",
  ghost: "text-ink-soft hover:text-accent-foreground",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-5 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-12 px-7 text-[15px]",
};

export default function Button({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  disabled = false,
  ariaLabel,
  newTab = false,
  download = false,
  onClick,
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);
  const motionProps = {
    whileHover: disabled ? undefined : { y: -2 },
    whileTap: disabled ? undefined : { scale: 0.97 },
  };

  if (href && !disabled) {
    return (
      <motion.a
        href={href}
        aria-label={ariaLabel}
        className={classes}
        onClick={onClick}
        {...(newTab ? { target: "_blank", rel: "noreferrer" } : {})}
        {...(download ? { download: true } : {})}
        {...motionProps}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type="button"
      aria-label={ariaLabel}
      aria-disabled={disabled}
      disabled={disabled}
      className={classes}
      onClick={onClick}
      {...motionProps}
    >
      {children}
    </motion.button>
  );
}