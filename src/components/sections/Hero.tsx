import fs from "node:fs";
import path from "node:path";

import { ArrowDown, ArrowRight } from "lucide-react";

import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import HeroVisual from "@/components/sections/HeroVisual";
import { site } from "@/data/site";

function hasResume() {
  const file = path.join(process.cwd(), "public", "resume", "Manisha-Sahay-Resume.pdf");
  return fs.existsSync(file);
}

export default function Hero() {
  const resume = hasResume();

  return (
    <section
      id="home"
      className="relative overflow-hidden pb-20 pt-32 md:pb-28 md:pt-44"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 hero-background"
      />

      <Container>
        <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          <div>
            <Reveal>
              <p className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-soft shadow-soft">
                <span aria-hidden className="size-1.5 rounded-full bg-accent-deep" />
                Software Engineer &bull; Full Stack Developer
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <h1 className="mt-7 text-balance font-display text-[2.55rem] leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-[3.6rem]">
                Building thoughtful{" "}
                <span className="italic text-accent-deep">
                  digital experiences
                </span>{" "}
                with code.
              </h1>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg">
                Hi, I&rsquo;m {site.name} — a Software Engineer with 4+ years of
                experience building scalable web applications, cloud solutions
                and AI-powered experiences.
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Button href="#projects" size="lg">
                  View My Work
                  <ArrowRight className="size-4" />
                </Button>
                <Button
                  href={site.resumeHref}
                  variant="outline"
                  size="lg"
                  disabled={!resume}
                  download
                  ariaLabel={
                    resume
                      ? "Download resume"
                      : "Download resume — available soon"
                  }
                >
                  Download Resume
                  <ArrowDown className="size-4" />
                </Button>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="mt-10 flex items-center gap-2.5 text-sm text-ink-soft">
                <span className="relative flex size-2.5">
                  <span
                    aria-hidden
                    className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-50"
                  />
                  <span
                    aria-hidden
                    className="relative inline-flex size-2.5 rounded-full bg-success"
                  />
                </span>
                {site.availability}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.2} className="mt-4 lg:mt-0">
            <HeroVisual />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}