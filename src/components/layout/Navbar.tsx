"use client";

import { useEffect, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";

import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { navItems, site } from "@/data/site";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.href.slice(1)))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-line bg-surface/80 shadow-header backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <Container>
        <nav
          aria-label="Main navigation"
          className="flex h-16 items-center justify-between md:h-20"
        >
          <a
            href="#home"
            className="flex items-center gap-2.5 rounded-lg"
            aria-label={`${site.name} — home`}
          >
            <span className="grid size-9 place-items-center rounded-xl bg-accent-dark font-display text-lg font-semibold text-white">
              M
            </span>
            <span className="whitespace-nowrap font-display text-[17px] font-semibold tracking-tight text-ink max-[340px]:hidden">
              {site.name}
            </span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              const id = item.href.slice(1);
              const isActive = active === id;
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "relative block rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "text-accent-foreground"
                        : "text-ink-soft hover:text-ink",
                    )}
                  >
                    {item.label}
                    {isActive ? (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-x-3.5 -bottom-px h-0.5 rounded-full bg-accent"
                      />
                    ) : null}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button
              href="#contact"
              size="sm"
              className="hidden sm:inline-flex"
            >
              Let&rsquo;s Talk
              <ArrowUpRight className="size-4" />
            </Button>

            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="grid size-10 place-items-center rounded-full border border-line bg-surface text-ink transition-colors hover:border-accent hover:text-accent-foreground md:hidden"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </nav>
      </Container>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden border-b border-line bg-surface/95 backdrop-blur-md md:hidden"
          >
            <Container className="pb-6 pt-2">
              <ul className="flex flex-col">
                {navItems.map((item, index) => {
                  const id = item.href.slice(1);
                  const isActive = active === id;
                  return (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.04, duration: 0.2 }}
                    >
                      <a
                        href={item.href}
                        onClick={() => setOpen(false)}
                        aria-current={isActive ? "true" : undefined}
                        className={cn(
                          "flex items-center justify-between rounded-xl px-3 py-3 text-base font-medium transition-colors",
                          isActive
                            ? "text-accent-foreground"
                            : "text-ink-soft hover:text-ink",
                        )}
                      >
                        {item.label}
                        <ArrowUpRight className="size-4 text-ink-faint" />
                      </a>
                    </motion.li>
                  );
                })}
              </ul>
              <Button
                href="#contact"
                className="mt-4 w-full"
                onClick={() => setOpen(false)}
              >
                Let&rsquo;s Talk
                <ArrowUpRight className="size-4" />
              </Button>
            </Container>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}