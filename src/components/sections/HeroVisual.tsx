"use client";

import {
  BrainCircuit,
  Cloud,
  Code2,
  Database,
  Hexagon,
  Triangle,
  type LucideIcon,
} from "lucide-react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

interface Chip {
  icon: LucideIcon;
  label: string;
  position: string;
  tone: "accent" | "sky" | "ink";
  delay: number;
  float: number;
}

const chips: Chip[] = [
  {
    icon: Cloud,
    label: "Azure",
    position: "left-1/2 top-0 -translate-x-1/2 sm:translate-x-0 sm:left-2 sm:top-2",
    tone: "sky",
    delay: 0.7,
    float: 0,
  },
  {
    icon: Code2,
    label: ".NET",
    position: "left-0 top-16 -translate-x-4 sm:top-20 sm:-translate-x-8",
    tone: "accent",
    delay: 0.95,
    float: 1,
  },
  {
    icon: Hexagon,
    label: "Angular",
    position: "-right-1 top-10 sm:right-0 sm:top-14",
    tone: "sky",
    delay: 1.2,
    float: 2,
  },
  {
    icon: Triangle,
    label: "Next.js",
    position: "right-0 bottom-20 sm:bottom-24",
    tone: "ink",
    delay: 1.45,
    float: 3,
  },
  {
    icon: Database,
    label: "SQL",
    position: "bottom-16 left-0 -translate-x-3 sm:bottom-20 sm:left-1 sm:-translate-x-6",
    tone: "ink",
    delay: 1.7,
    float: 4,
  },
  {
    icon: BrainCircuit,
    label: "AI",
    position: "-bottom-3 left-1/2 -translate-x-1/2 sm:left-auto sm:right-1/4 sm:translate-x-0",
    tone: "accent",
    delay: 1.95,
    float: 5,
  },
];

const toneClasses: Record<Chip["tone"], string> = {
  accent: "text-accent-foreground",
  sky: "text-sky-deep",
  ink: "text-ink",
};

export default function HeroVisual() {
  return (
    <div className="relative mx-auto aspect-[4/5] w-full max-w-[420px] sm:aspect-square sm:max-w-[520px]">
      <div
        aria-hidden
        className="absolute inset-0 rounded-[3rem] hero-visual-background"
      />
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 size-[19rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-accent/30 sm:size-[24rem]"
      />
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 size-[13rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-line sm:size-[17rem]"
      />
      <div
        aria-hidden
        className="absolute right-3 top-6 hidden gap-1.5 sm:flex"
      >
        {Array.from({ length: 3 }).map((_, index) => (
          <span key={index} className="size-1.5 rounded-full bg-accent/40" />
        ))}
      </div>
      <div aria-hidden className="absolute left-4 bottom-8 hidden gap-1.5 sm:flex">
        {Array.from({ length: 3 }).map((_, index) => (
          <span key={index} className="size-1.5 rounded-full bg-sky/40" />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="absolute left-1/2 top-1/2 w-[82%] max-w-[380px] -translate-x-1/2 -translate-y-1/2"
      >
        <div className="overflow-hidden rounded-3xl border border-line bg-surface shadow-lift">
          <div className="flex items-center justify-between border-b border-line bg-surface-soft px-5 py-3">
            <div className="flex items-center gap-1.5">
              <span className="size-2.5 rounded-full bg-accent/70" />
              <span className="size-2.5 rounded-full bg-sky/60" />
              <span className="size-2.5 rounded-full bg-ink/20" />
            </div>
            <span className="font-mono text-[11px] text-ink-faint">
              engineer.ts
            </span>
          </div>
          <pre className="overflow-x-auto p-5 font-mono text-[12px] leading-[1.8] sm:p-6 sm:text-[13.5px]">
            <code>
              <span className="text-accent-foreground">const</span>{" "}
              <span className="text-sky-deep">engineer</span>{" "}
              <span className="text-ink-soft">=</span>
              {"\n"}&#123;
              {"\n"}
              {"  "}build<span className="text-ink-soft">:</span>{" "}
              <span className="text-syntax-string">&quot;great things&quot;</span>
              <span className="text-ink-soft">,</span>
              {"\n"}
              {"  "}learn<span className="text-ink-soft">:</span>{" "}
              <span className="text-syntax-string">&quot;every day&quot;</span>
              <span className="text-ink-soft">,</span>
              {"\n"}
              {"  "}coffee<span className="text-ink-soft">:</span>{" "}
              <span className="text-sky-deep">true</span>
              <span className="text-ink-soft">,</span>
              {"\n"}
              &#125;<span className="text-ink-soft">;</span>
            </code>
          </pre>
        </div>
      </motion.div>

      {chips.map((chip) => (
        <motion.div
          key={chip.label}
          initial={{ opacity: 0, y: 18, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: chip.delay, ease: "easeOut" }}
          className={cn("absolute z-10", chip.position)}
        >
          <motion.div
            animate={{ y: [0, -7, 0] }}
            transition={{
              duration: 5.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: chip.float,
            }}
          >
            <div className="flex items-center gap-2 rounded-2xl border border-line bg-surface px-3.5 py-2 shadow-soft">
              <chip.icon className={cn("size-4", toneClasses[chip.tone])} />
              <span className="text-xs font-semibold text-ink">
                {chip.label}
              </span>
            </div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}