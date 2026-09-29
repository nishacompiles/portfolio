import type { LucideIcon } from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
}

export interface SkillCategory {
  id: string;
  label: string;
  icon: LucideIcon;
  skills: string[];
}

export interface ExperienceEntry {
  role: string;
  company: string;
  location: string;
  period: string;
  present: boolean;
  summary: string;
  responsibilities: string[];
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  technologies: string[];
  featured: boolean;
  architecture?: string[];
  accent: "lavender" | "sky";
  github: string;
  demo: string;
}

export interface FlowStep {
  label: string;
  icon: LucideIcon;
}

export interface MindsetStep {
  number: string;
  title: string;
  description: string;
}