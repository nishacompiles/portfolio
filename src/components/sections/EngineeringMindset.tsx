import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import type { MindsetStep } from "@/types";

const steps: MindsetStep[] = [
  {
    number: "01",
    title: "Understand",
    description: "Start with the problem, not the technology.",
  },
  {
    number: "02",
    title: "Design",
    description: "Keep architecture simple, scalable and maintainable.",
  },
  {
    number: "03",
    title: "Build",
    description: "Write clean, testable and reliable code.",
  },
  {
    number: "04",
    title: "Improve",
    description: "Measure, learn and continuously make things better.",
  },
];

export default function EngineeringMindset() {
  return (
    <Section id="approach">
      <SectionHeading
        eyebrow="Engineering Mindset"
        title="How I think about building software"
        description="Good software starts with good judgement — a calm, deliberate loop that turns ambiguity into something dependable."
      />

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => (
          <Reveal key={step.number} delay={index * 0.09}>
            <div className="group relative h-full overflow-hidden rounded-2xl border border-line bg-surface p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lift">
              <span
                aria-hidden
                className="pointer-events-none absolute -right-2 -top-4 font-display text-7xl font-semibold text-ink/[0.05] transition-colors duration-300 group-hover:text-accent/[0.08]"
              >
                {step.number}
              </span>
              <p className="font-display text-sm font-semibold tracking-[0.2em] text-accent-deep">
                {step.number}
              </p>
              <h3 className="mt-3 font-display text-xl font-semibold tracking-tight text-ink">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                {step.description}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}