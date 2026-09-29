import type { NavItem } from "@/types";

export const site = {
  name: "Manisha Sahay",
  role: "Software Engineer",
  tagline: "Software Engineer / Full Stack Developer",
  location: "Dehradun, Uttarakhand, India",
  company: "Evon Technologies",
  currentRole: "Associate Developer",
  period: "November 2022 – Present",
  availability: "Available for exciting opportunities",

  // TODO: Replace the placeholder values below with your real details.
  email: "hello@manishasahay.dev",
  resumeHref: "/resume/Manisha-Sahay-Resume.pdf",
  links: {
    github: "https://github.com/manisha-sahay",
    linkedin: "https://www.linkedin.com/in/manisha-sahay",
  },
};

export const navItems: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];