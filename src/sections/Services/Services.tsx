import {
  Bot,
  Briefcase,
  Cloud,
  Globe2,
  GraduationCap,
  Plug,
  Users,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { services } from '@/data/services';
import { SectionTitle } from '@/components/SectionTitle/SectionTitle';
import { Reveal } from '@/components/Reveal';

const iconMap: Record<string, LucideIcon> = {
  bot: Bot,
  globe: Globe2,
  cloud: Cloud,
  briefcase: Briefcase,
  users: Users,
  graduation: GraduationCap,
  plug: Plug,
};

export function Services() {
  return (
    <section className="section-pad">
      <div className="container-page">
        <Reveal>
          <SectionTitle
            eyebrow="Services"
            title="Software that supports how organizations actually work."
            description="Focused delivery across web apps, SaaS, management systems, and integrations."
          />
        </Reveal>

        <div className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon] ?? Globe2;
            return (
              <Reveal key={service.id} delay={index * 0.04}>
                <article className="group relative h-full overflow-hidden rounded-[1.5rem] border border-border bg-surface-elevated/40 p-7 transition duration-300 hover:-translate-y-1 hover:border-accent/35 hover:bg-surface-elevated">
                  <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-accent/10 blur-2xl transition group-hover:bg-accent/20" />
                  <div className="mb-6 flex items-center justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-surface text-accent">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <span className="font-mono text-[11px] text-ink-faint">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="text-display text-xl font-semibold text-ink">{service.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-muted">{service.description}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
