import { aboutHighlights, siteConfig } from '@/lib/siteConfig';
import { SectionTitle } from '@/components/SectionTitle/SectionTitle';
import { Reveal } from '@/components/Reveal';

export function About() {
  return (
    <section className="section-pad">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_left,rgba(125,211,252,0.06),transparent_50%)]" aria-hidden />
      <div className="container-page relative">
        <Reveal>
          <SectionTitle
            eyebrow="About"
            title="Building practical systems with clarity and craft."
            description="A software developer focused on turning real organizational needs into reliable digital products."
          />
        </Reveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <Reveal delay={0.05}>
            <article className="glass-panel rounded-[1.75rem] p-7 sm:p-10">
              <p className="text-lg leading-relaxed text-ink-muted sm:text-xl sm:leading-relaxed">
                I am a software developer with a strong focus on building practical digital solutions
                for businesses and organizations. My work involves designing and developing web
                applications, management systems, APIs, databases and SaaS platforms.
              </p>
              <p className="mt-6 text-sm text-ink-faint">
                {siteConfig.brand} · {siteConfig.name} · {siteConfig.location}
              </p>

              <div className="mt-10 border-t border-border pt-8">
                <h3 className="text-display text-sm font-semibold uppercase tracking-[0.18em] text-accent">
                  What I bring
                </h3>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {aboutHighlights.map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-border bg-surface/50 px-4 py-3.5 text-sm font-medium text-ink transition hover:border-accent/30"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </article>
          </Reveal>

          <Reveal delay={0.1}>
            <aside className="flex h-full flex-col justify-between gap-6 rounded-[1.75rem] border border-border bg-gradient-to-b from-accent/10 via-surface-elevated to-surface-elevated p-7 sm:p-8">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
                  Mission
                </p>
                <p className="text-display mt-4 text-2xl font-semibold leading-snug text-ink">
                  Ship software that organizations can trust — clear architecture, useful features,
                  and systems that scale with the business.
                </p>
              </div>
              <ul className="space-y-4 border-t border-border pt-6">
                {[
                  'Web & SaaS platforms',
                  'Business management systems',
                  'Education & HR systems',
                  'APIs & database design',
                ].map((item, i) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-ink-muted">
                    <span className="mt-0.5 font-mono text-[11px] text-accent">0{i + 1}</span>
                    <span className="font-medium text-ink">{item}</span>
                  </li>
                ))}
              </ul>
            </aside>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
