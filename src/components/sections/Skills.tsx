import Badge from "@/components/ui/Badge";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { skillCategories } from "@/data/skills";

export default function Skills() {
  return (
    <Section id="skills">
      <SectionHeading
        eyebrow="Skills"
        title="Tools I work with"
        description="A practical toolkit refined across enterprise applications, cloud services and machine-learning experiments."
      />

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map((category, index) => (
          <Reveal key={category.id} delay={(index % 3) * 0.08}>
            <div className="flex h-full flex-col rounded-2xl border border-line bg-surface p-6 shadow-card transition-colors duration-300 hover:border-accent/40">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-xl bg-accent-soft text-accent-foreground">
                  <category.icon className="size-5" />
                </span>
                <h3 className="font-display text-lg font-semibold tracking-tight text-ink">
                  {category.label}
                </h3>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <Badge key={skill}>{skill}</Badge>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}