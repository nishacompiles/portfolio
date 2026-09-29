import { Building2, CalendarDays, CircleCheck, MapPin } from "lucide-react";

import Badge from "@/components/ui/Badge";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { experience } from "@/data/experience";

export default function Experience() {
  return (
    <Section id="experience" className="bg-surface/50">
      <SectionHeading
        eyebrow="Experience"
        title="Where I’ve been"
        description="Four years of shipping software across the full stack — with a focus on .NET, Angular and the Microsoft Azure ecosystem."
      />

      <div className="mx-auto mt-14 max-w-3xl">
        <div className="relative">
          <span
            aria-hidden
            className="absolute bottom-4 left-[5px] top-4 w-0.5 bg-line"
          />
          {experience.map((entry) => (
            <div key={entry.role} className="relative pb-10 pl-12 sm:pl-16">
              <span
                aria-hidden
                className="absolute left-0 top-9 size-3 rounded-full bg-accent-dark ring-4 ring-accent-soft"
              >
                {entry.present ? (
                  <span className="absolute inset-0 animate-ping rounded-full bg-accent opacity-40" />
                ) : null}
              </span>

              <Reveal>
                <div className="rounded-2xl border border-line bg-surface p-6 shadow-card sm:p-8">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h3 className="font-display text-xl font-semibold tracking-tight text-ink sm:text-2xl">
                      {entry.role}
                    </h3>
                    {entry.present ? (
                      <Badge tone="accent">
                        <span className="mr-1.5 size-1.5 rounded-full bg-accent-foreground" />
                        Present
                      </Badge>
                    ) : null}
                  </div>

                  <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-ink-soft">
                    <span className="inline-flex items-center gap-1.5">
                      <Building2 className="size-4 text-accent-deep" />
                      {entry.company}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="size-4 text-accent-deep" />
                      {entry.location}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarDays className="size-4 text-accent-deep" />
                      {entry.period}
                    </span>
                  </div>

                  <p className="mt-5 leading-relaxed text-ink-soft">
                    {entry.summary}
                  </p>

                  <div className="mt-6 border-t border-line pt-6">
                    <ul className="grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
                      {entry.responsibilities.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2.5 text-sm text-ink"
                        >
                          <CircleCheck className="mt-0.5 size-4 shrink-0 text-accent-deep" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}