import { ArrowUpRight, Mail, MapPin } from "lucide-react";

import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/SocialIcons";
import { site } from "@/data/site";

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-20 py-20 md:py-28">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] border border-line bg-surface p-8 text-center shadow-card sm:p-14">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 contact-background"
            />
            <div className="relative">
              <Reveal>
                <p className="inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.22em] text-accent-deep">
                  <span aria-hidden className="h-px w-6 bg-accent" />
                  Contact
                  <span aria-hidden className="h-px w-6 bg-accent" />
                </p>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="mx-auto mt-5 max-w-2xl text-balance font-display text-3xl leading-tight tracking-tight text-ink sm:text-4xl">
                  Have an idea? Let&rsquo;s build it.
                </h2>
              </Reveal>
              <Reveal delay={0.16}>
                <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg">
                  Whether it&rsquo;s a new project, an interesting engineering
                  challenge or simply a conversation about technology,
                  I&rsquo;d love to hear from you.
                </p>
              </Reveal>
              <Reveal delay={0.24}>
                <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                  <Button
                    href={`mailto:${site.email}`}
                    size="lg"
                    ariaLabel={`Email ${site.name}`}
                  >
                    <Mail className="size-4" />
                    Email Me
                    <ArrowUpRight className="size-4" />
                  </Button>
                  <Button
                    href={site.links.linkedin}
                    variant="outline"
                    size="lg"
                    newTab
                    ariaLabel={`${site.name} on LinkedIn`}
                  >
                    <LinkedInIcon className="size-4" />
                    LinkedIn
                  </Button>
                  <Button
                    href={site.links.github}
                    variant="outline"
                    size="lg"
                    newTab
                    ariaLabel={`${site.name} on GitHub`}
                  >
                    <GitHubIcon className="size-4" />
                    GitHub
                  </Button>
                </div>
              </Reveal>
              <Reveal delay={0.3}>
                <p className="mt-9 inline-flex items-center gap-2 text-sm text-ink-faint">
                  <MapPin className="size-4" />
                  {site.location}
                </p>
              </Reveal>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}