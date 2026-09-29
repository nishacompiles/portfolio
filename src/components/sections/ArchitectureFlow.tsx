import {
  ArrowDown,
  ArrowRight,
  Braces,
  Cloud,
  Cog,
  Database,
  Layers,
  Lightbulb,
  PenTool,
  Rocket,
  type LucideIcon,
} from "lucide-react";

import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";

interface FlowStep {
  label: string;
  icon: LucideIcon;
}

const steps: FlowStep[] = [
  { label: "Idea", icon: Lightbulb },
  { label: "UI / UX", icon: PenTool },
  { label: "Frontend", icon: Layers },
  { label: "API", icon: Braces },
  { label: "Business Logic", icon: Cog },
  { label: "Database", icon: Database },
  { label: "Cloud", icon: Cloud },
  { label: "Production", icon: Rocket },
];

export default function ArchitectureFlow() {
  return (
    <Section id="process" className="bg-surface/50">
      <SectionHeading
        eyebrow="Process"
        title="From idea to production"
        description="The path a feature takes — a clear, connected pipeline from a spark of an idea to software people actually use."
      />

      <Reveal delay={0.1} className="mt-12">
        <div className="flex flex-col items-center gap-2 rounded-3xl border border-line bg-surface p-6 shadow-card sm:p-10 md:flex-row md:flex-wrap md:justify-center md:gap-0">
          {steps.map((step, index) => {
            const isLast = index === steps.length - 1;
            return (
              <div
                key={step.label}
                className="flex flex-col items-center md:flex-row"
              >
                <div className="flex items-center gap-2.5 rounded-xl border border-line bg-canvas px-4 py-2.5 text-sm font-medium text-ink shadow-soft transition-colors duration-300 hover:border-accent/50 hover:bg-surface">
                  <step.icon className="size-4 text-accent-deep" />
                  {step.label}
                </div>
                {!isLast ? (
                  <>
                    <ArrowDown
                      aria-hidden
                      className="my-1 size-4 text-ink-faint md:hidden"
                    />
                    <ArrowRight
                      aria-hidden
                      className="mx-2 hidden size-4 text-ink-faint md:block"
                    />
                  </>
                ) : null}
              </div>
            );
          })}
        </div>
      </Reveal>
    </Section>
  );
}