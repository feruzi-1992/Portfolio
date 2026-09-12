import {
  Boxes,
  Cloud,
  Code2,
  Database,
  Smartphone,
  Wrench,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { technologyStack } from '@/data/skills';
import { SectionTitle } from '@/components/SectionTitle/SectionTitle';
import { Reveal } from '@/components/Reveal';

const groupIcons: Record<string, LucideIcon> = {
  Frontend: Code2,
  Backend: Boxes,
  Database: Database,
  Mobile: Smartphone,
  DevOps: Cloud,
  Tools: Wrench,
};

export function Technologies() {
  return (
    <section className="section-pad">
      <div className="container-page">
        <Reveal>
          <SectionTitle
            eyebrow="Stack"
            title="Technology categories at a glance."
            description="Organized for clarity — frontend, backend, data, mobile, DevOps, and tools."
          />
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {technologyStack.map((group, index) => {
            const Icon = groupIcons[group.group] ?? Code2;
            return (
              <Reveal key={group.group} delay={index * 0.04}>
                <div className="group h-full rounded-[1.5rem] border border-border bg-surface-elevated/40 p-6 transition duration-300 hover:-translate-y-1 hover:border-accent/30 hover:bg-surface-elevated">
                  <div className="mb-5 flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-accent-soft text-accent transition group-hover:border-accent/30">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <h3 className="text-display text-lg font-semibold text-ink">{group.group}</h3>
                  </div>
                  <ul className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-lg bg-surface px-2.5 py-1 text-xs font-medium text-ink-muted ring-1 ring-border"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
