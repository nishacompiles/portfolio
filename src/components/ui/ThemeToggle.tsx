"use client";

import { useEffect, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";

type Theme = "light" | "dark";

const STORAGE_KEY = "theme";

function getInitialTheme(): Theme {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    // localStorage unavailable — fall through to system preference.
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const id = requestAnimationFrame(() => setTheme(getInitialTheme()));

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (event: MediaQueryListEvent) => {
      try {
        if (!window.localStorage.getItem(STORAGE_KEY)) {
          setTheme(event.matches ? "dark" : "light");
        }
      } catch {
        // Ignore storage errors when following system preference.
      }
    };
    media.addEventListener("change", onChange);
    return () => {
      cancelAnimationFrame(id);
      media.removeEventListener("change", onChange);
    };
  }, []);

  useEffect(() => {
    if (theme) {
      document.documentElement.classList.toggle("dark", theme === "dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Persist the choice when possible; theme still applies for the session.
    }
  };

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className="relative grid size-10 place-items-center overflow-hidden rounded-full border border-line bg-surface text-accent-foreground transition-colors hover:border-accent"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ y: 16, opacity: 0, rotate: -30 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: -16, opacity: 0, rotate: 30 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="flex"
        >
          {theme === "dark" ? (
            <Sun className="size-[18px]" />
          ) : (
            <Moon className="size-[18px]" />
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}