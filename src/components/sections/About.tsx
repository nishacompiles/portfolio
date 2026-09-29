import { BadgeCheck, BrainCircuit, Cloud, Layers } from "lucide-react";

import Badge from "@/components/ui/Badge";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

const highlights = [
  {
    icon: BadgeCheck,
    value: "4+",
    label: "Years Experience",
    tone: "text-accent-foreground bg-accent-soft",
  },
  {
    icon: Layers,
    value: "Full Stack",
    label: "Development",
    tone: "text-sky-deep bg-sky-soft",
  },
  {
    icon: Cloud,
    value: "Azure",
    label: "Cloud & Integration",
    tone: "text-sky-deep bg-sky-soft",
  },
  {
    icon: BrainCircuit,
    value: "AI / ML",
    label: "Exploration",
    tone: "text-accent-foreground bg-accent-soft",
  },
];

const workingWith = [".NET", "Angular", "Next.js", "Azure"];

export default function About() {
  return (
    <Section id="about">
      <SectionHeading
        eyebrow="About"
        title="A little about me"
        align="left"
        className="max-w-none"
      />

      <div className="mt-12 grid items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <Reveal>
          <div>
            <p className="text-lg leading-relaxed text-ink-soft sm:text-xl">
              I&rsquo;m a Full Stack Developer who enjoys turning complex
              problems into simple, reliable and intuitive software. My work
              spans frontend development, backend APIs, cloud integrations,
              databases and AI/ML experimentation.
            </p>
            <p className="mt-6 text-sm font-medium uppercase tracking-[0.18em] text-ink-faint">
              Currently working with
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {workingWith.map((tech) => (
                <Badge key={tech} tone="accent" className="px-3.5 py-1.5">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 gap-4">
          {highlights.map((item, index) => (
            <Reveal key={item.label} delay={index * 0.08}>
              <div className="group h-full rounded-2xl border border-line bg-surface p-5 shadow-card transition-colors duration-300 hover:border-accent/40 sm:p-6">
                <span
                  className={cn(
                    "grid size-10 place-items-center rounded-xl",
                    item.tone,
                  )}
                >
                  <item.icon className="size-5" />
                </span>
                <p className="mt-4 font-display text-2xl font-semibold leading-tight tracking-tight text-ink sm:text-[1.7rem]">
                  {item.value}
                </p>
                <p className="mt-1 text-sm text-ink-soft">{item.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}