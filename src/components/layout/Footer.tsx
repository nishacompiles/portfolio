import { Mail } from "lucide-react";

import Container from "@/components/ui/Container";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/SocialIcons";
import { site } from "@/data/site";

export default function Footer() {
  const socialLinks = [
    {
      label: "GitHub",
      href: site.links.github,
      icon: GitHubIcon,
    },
    {
      label: "LinkedIn",
      href: site.links.linkedin,
      icon: LinkedInIcon,
    },
    {
      label: "Email",
      href: `mailto:${site.email}`,
      icon: Mail,
    },
  ];

  return (
    <footer className="border-t border-line bg-surface/60">
      <Container className="py-12">
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-xl bg-accent-soft font-display text-lg font-semibold text-accent-foreground">
              M
            </span>
            <div>
              <p className="font-display text-base font-semibold tracking-tight text-ink">
                {site.name}
              </p>
              <p className="text-sm text-ink-soft">Software Engineer</p>
            </div>
          </div>

          <nav aria-label="Social links" className="flex items-center gap-2">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  link.href.startsWith("http") ? "noreferrer" : undefined
                }
                aria-label={link.label}
                className="grid size-10 place-items-center gap-2 rounded-full border border-line bg-surface text-ink-soft transition-colors hover:border-accent hover:text-accent-foreground"
              >
                <link.icon className="size-[18px]" />
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-2 border-t border-line pt-6 text-sm text-ink-faint sm:flex-row sm:items-center">
          <p>&copy; 2026 {site.name}</p>
          <p>Built with Next.js &amp; TypeScript</p>
        </div>
      </Container>
    </footer>
  );
}