"use client";

import { ArrowUpRight, Layers } from "lucide-react";
import { motion } from "framer-motion";

import Badge from "@/components/ui/Badge";
import { GitHubIcon } from "@/components/ui/SocialIcons";
import type { Project } from "@/types";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay: (index % 3) * 0.09 }}
      whileHover={{ y: -5 }}
      className="flex h-full flex-col rounded-2xl border border-line bg-surface p-6 shadow-card transition-colors duration-300 hover:border-line-strong hover:shadow-lift"
    >
      <div
        className={cn(
          "grid size-10 place-items-center rounded-xl",
          project.accent === "lavender"
            ? "bg-accent-soft text-accent-foreground"
            : "bg-sky-soft text-sky-deep",
        )}
      >
        <Layers className="size-5" />
      </div>

      <h3 className="mt-5 font-display text-lg font-semibold tracking-tight text-ink">
        {project.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-soft">
        {project.description}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.technologies.map((tech) => (
          <Badge key={tech}>{tech}</Badge>
        ))}
      </div>

      <div className="mt-auto flex items-center gap-5 pt-6">
        <a
          href={project.github}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink transition-colors hover:text-accent-foreground"
        >
          <GitHubIcon className="size-4" />
          GitHub
        </a>
        <a
          href={project.demo}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink transition-colors hover:text-accent-foreground"
        >
          Live Demo
          <ArrowUpRight className="size-4 text-ink-faint" />
        </a>
      </div>
    </motion.article>
  );
}