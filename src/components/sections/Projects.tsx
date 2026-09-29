import { ArrowUpRight } from "lucide-react";

import Badge from "@/components/ui/Badge";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { GitHubIcon } from "@/components/ui/SocialIcons";
import FeaturedArchitecture from "@/components/sections/FeaturedArchitecture";
import ProjectCard from "@/components/sections/ProjectCard";
import { projects } from "@/data/projects";

export default function Projects() {
  const featured = projects.find((project) => project.featured);
  const rest = projects.filter((project) => !project.featured);

  return (
    <Section id="projects" className="bg-surface/50">
      <SectionHeading
        eyebrow="Projects"
        title="Things I’ve built"
        description="A mix of enterprise integration work and personal engineering experiments — from event-driven cloud platforms to on-device AI."
      />

      {featured ? (
        <Reveal className="mt-14">
          <div className="grid gap-10 rounded-3xl border border-line bg-surface p-6 shadow-card sm:p-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14">
            <div>
              <Badge tone="accent" className="px-3.5 py-1.5">
                Featured Project
              </Badge>
              <h3 className="mt-5 text-balance font-display text-2xl font-semibold leading-tight tracking-tight text-ink sm:text-[2rem]">
                {featured.title}
              </h3>
              <p className="mt-4 leading-relaxed text-ink-soft">
                {featured.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {featured.technologies.map((tech) => (
                  <Badge key={tech} tone="neutral">
                    {tech}
                  </Badge>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                <a
                  href={featured.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-ink transition-colors hover:text-accent-foreground"
                >
                  <GitHubIcon className="size-4" />
                  GitHub
                  <ArrowUpRight className="size-4 text-ink-faint" />
                </a>
                <a
                  href={featured.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-ink transition-colors hover:text-accent-foreground"
                >
                  Live Demo
                  <ArrowUpRight className="size-4 text-ink-faint" />
                </a>
              </div>
            </div>

            <FeaturedArchitecture steps={featured.architecture ?? []} />
          </div>
        </Reveal>
      ) : null}

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
      </div>
    </Section>
  );
}