"use client";

import { motion } from "framer-motion";
import {
  ChevronDown,
  Cloud,
  Code2,
  Cog,
  Database,
  Hexagon,
  Network,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";

function nodeIcon(label: string): LucideIcon {
  const key = label.toLowerCase();
  if (key.includes("angular")) return Hexagon;
  if (key.includes("api") || key.includes(".net")) return Code2;
  if (key.includes("logic")) return Cog;
  if (key.includes("sql") || key.includes("database")) return Database;
  if (key.includes("azure") || key.includes("cloud")) return Cloud;
  return Network;
}

interface FeaturedArchitectureProps {
  steps: string[];
}

export default function FeaturedArchitecture({ steps }: FeaturedArchitectureProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-line bg-canvas p-6 sm:p-8">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 featured-background"
      />
      <p className="relative text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-faint">
        System architecture
      </p>

      <div className="relative mt-6 flex flex-col items-center">
        {steps.map((step, index) => {
          const Icon = nodeIcon(step);
          const isEdge = index === 0 || index === steps.length - 1;
          const isLast = index === steps.length - 1;
          return (
            <div key={step} className="flex flex-col items-center">
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.45, delay: index * 0.1 }}
              >
                <div
                  className={cn(
                    "flex items-center gap-2.5 rounded-xl border px-4 py-2.5 text-sm font-medium shadow-soft transition-colors duration-300 hover:border-accent/50",
                    isEdge
                      ? "border-accent/30 bg-accent-soft text-accent-foreground"
                      : "border-line bg-surface text-ink",
                  )}
                >
                  <Icon className="size-4" />
                  {step}
                </div>
              </motion.div>
              {!isLast ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: (index + 1) * 0.1 }}
                  aria-hidden
                  className="flex items-center justify-center"
                >
                  <ChevronDown className="my-0.5 size-4 text-ink-faint" />
                </motion.div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}