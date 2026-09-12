import { experience } from '@/data/experience';
import { SectionTitle } from '@/components/SectionTitle/SectionTitle';
import { Reveal } from '@/components/Reveal';

export function Experience() {
  return (
    <section className="section-pad">
      <div className="container-page">
        <Reveal>
          <SectionTitle
            eyebrow="Journey"
            title="Professional focus and delivery."
            description="Editable professional timeline — only verified roles and focus areas are shown."
          />
        </Reveal>

        <div className="relative mt-14 space-y-6 border-l border-border pl-6 sm:pl-10">
          {experience.map((item, index) => (
            <Reveal key={item.id} delay={index * 0.05}>
              <article className="relative rounded-[1.5rem] border border-border bg-surface-elevated/50 p-6 transition hover:border-accent/30 sm:p-8">
                <span className="absolute -left-[1.9rem] top-8 h-3 w-3 rounded-full bg-accent shadow-[0_0_0_6px_rgba(125,211,252,0.15)] sm:-left-[2.85rem]" />
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h3 className="text-display text-2xl font-semibold text-ink">{item.role}</h3>
                  <span className="rounded-full border border-border px-3 py-1 text-[11px] font-medium text-ink-faint">
                    {item.period}
                  </span>
                </div>
                <p className="mt-2 text-sm font-semibold text-accent">{item.organization}</p>
                <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-faint">
                  Focus
                </p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {item.focus.map((focus) => (
                    <li
                      key={focus}
                      className="rounded-full border border-border bg-surface px-3 py-1.5 text-sm text-ink-muted"
                    >
                      {focus}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
