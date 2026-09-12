import { Link } from 'react-router-dom';
import { ArrowDown, ArrowRight, Mail } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { HeroVisual } from '@/components/HeroVisual/HeroVisual';
import { useSiteSettings } from '@/hooks/useSiteSettings';
import { normalizeHomeContent } from '@/lib/homeContent';
import { firstEnabledPath } from '@/lib/pageControls';

export function Hero() {
  const reduce = useReducedMotion();
  const { settings } = useSiteSettings();
  const home = normalizeHomeContent(settings.home_content);
  const explorePath = settings.page_about_enabled
    ? '/about'
    : firstEnabledPath(settings) === '/'
      ? '/about'
      : firstEnabledPath(settings);
  const cvViewHref = `${import.meta.env.BASE_URL}cv.html`;

  return (
    <section className="relative min-h-[100svh] overflow-hidden pb-16 pt-28 sm:pb-20 sm:pt-32">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(125,211,252,0.12),transparent_55%)]" />
        <div className="absolute inset-0 grid-noise opacity-60" />
        <div className="absolute -left-24 top-40 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute -right-20 bottom-20 h-80 w-80 rounded-full bg-violet-500/10 blur-3xl" />
      </div>

      <div className="container-page relative grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
        <div>
          <motion.p
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-surface-elevated/50 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-accent backdrop-blur"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            {home.eyebrow}
          </motion.p>

          <motion.h1
            className="text-display max-w-3xl text-[clamp(1.75rem,4vw,2.75rem)] font-bold leading-[1.15] text-ink"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: reduce ? 0 : 0.05 }}
          >
            {home.headline}
          </motion.h1>

          <motion.p
            className="mt-6 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg"
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: reduce ? 0 : 0.12 }}
          >
            {home.subtitle}
          </motion.p>

          <motion.div
            className="mt-9 flex flex-wrap gap-3"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: reduce ? 0 : 0.18 }}
          >
            {settings.page_projects_enabled ? (
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-surface transition hover:-translate-y-0.5 hover:bg-accent-hover hover:shadow-[0_10px_40px_rgba(125,211,252,0.25)]"
              >
                {home.ctaPrimary}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            ) : null}
            <a
              href={cvViewHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-transparent px-6 py-3 text-sm font-semibold text-ink transition hover:border-accent/40 hover:bg-accent-soft"
            >
              View CV
            </a>
            {settings.page_contact_enabled ? (
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-transparent px-6 py-3 text-sm font-semibold text-ink transition hover:border-accent/40 hover:bg-accent-soft"
              >
                <Mail className="h-4 w-4" aria-hidden />
                {home.ctaSecondary}
              </Link>
            ) : null}
          </motion.div>

          <motion.ul
            className="mt-12 flex flex-wrap gap-2"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: reduce ? 0 : 0.28 }}
          >
            {home.trustIndicators.map((item) => (
              <li
                key={item}
                className="rounded-full border border-border bg-surface-elevated/40 px-3.5 py-1.5 text-xs font-medium text-ink-muted backdrop-blur sm:text-[13px]"
              >
                {item}
              </li>
            ))}
          </motion.ul>
        </div>

        <HeroVisual alt={home.imageAlt} portraitUrl={home.portraitUrl} />
      </div>

      {settings.page_about_enabled || explorePath !== '/' ? (
        <Link
          to={explorePath}
          className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em] text-ink-faint transition hover:text-accent sm:flex"
          aria-label={`${home.exploreLabel} page`}
        >
          {home.exploreLabel}
          <motion.span
            animate={reduce ? undefined : { y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowDown className="h-4 w-4" />
          </motion.span>
        </Link>
      ) : null}
    </section>
  );
}
