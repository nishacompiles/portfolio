"use client";

import type { ReactNode } from "react";

import { useReducedMotion } from "framer-motion";
import { motion } from "framer-motion";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "li" | "span";
}

export default function Reveal({
  children,
  delay = 0,
  y = 26,
  className,
  as = "div",
}: RevealProps) {
  const reduceMotion = useReducedMotion();
  const Component = as === "li" ? motion.li : as === "span" ? motion.span : motion.div;

  return (
    <Component
      className={className}
      initial={{ opacity: 0, y: reduceMotion ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </Component>
  );
}