import { skillGroups } from '@/data/skills';
import { SectionTitle } from '@/components/SectionTitle/SectionTitle';
import { Reveal } from '@/components/Reveal';

export function Skills() {
  return (
    <section className="section-pad bg-surface-muted/60">
      <div className="container-page">
        <Reveal>
          <SectionTitle
            eyebrow="Skills"
            title="A practical stack for shipping real systems."
            description="Technologies used across frontend, backend, databases, mobile, and tooling — shown as professional badges, not fake percentages."
          />
        </Reveal>

        <div className="mt-14 space-y-8">
          {skillGroups.map((group, index) => (
            <Reveal key={group.category} delay={index * 0.04}>
              <div className="rounded-[1.5rem] border border-border bg-surface-elevated/50 p-6 sm:p-8">
                <div className="mb-5 flex items-baseline justify-between gap-4">
                  <h3 className="text-display text-xl font-semibold text-ink">{group.category}</h3>
                  <span className="font-mono text-[11px] text-ink-faint">
                    {String(group.skills.length).padStart(2, '0')} tools
                  </span>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-border bg-surface/70 px-4 py-2 text-sm font-medium text-ink transition hover:border-accent/40 hover:text-accent"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
