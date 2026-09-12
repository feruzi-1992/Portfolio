import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';
import { brandLabel, navItems, siteConfig } from '@/lib/siteConfig';
import { useSiteSettings } from '@/hooks/useSiteSettings';
import { filterNavBySettings } from '@/lib/pageControls';
import { hasUrl } from '@/utils/cn';

export function Footer() {
  const [showTop, setShowTop] = useState(false);
  const { settings } = useSiteSettings();
  const links = filterNavBySettings(
    navItems.filter((item) =>
      ['/', '/about', '/projects', '/services', '/process', '/contact'].includes(item.path),
    ),
    settings,
  );

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <footer className="relative border-t border-border bg-surface-muted">
      <div className="container-page grid gap-10 py-16 md:grid-cols-[1.3fr_1fr]">
        <div>
          <p className="text-display text-2xl font-bold text-ink">
            <span className="text-accent">{siteConfig.brand}</span>
            <span className="mx-1.5 text-ink-faint">·</span>
            {siteConfig.name}
          </p>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-muted">{siteConfig.tagline}</p>
          <p className="sr-only">{brandLabel}</p>
        </div>
        <div className="flex flex-wrap content-start gap-x-6 gap-y-3 md:justify-end">
          {links.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="text-sm text-ink-muted transition hover:text-accent"
            >
              {item.label}
            </Link>
          ))}
          {hasUrl(siteConfig.github) ? (
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-ink-muted transition hover:text-accent"
            >
              GitHub
            </a>
          ) : null}
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container-page flex flex-col gap-1.5 py-5 text-sm text-ink-faint sm:items-start">
          <p>The system is developed and maintained by Developer Feruzi</p>
          <p>PrimoSoftware · 2026 · All rights reserved</p>
        </div>
      </div>

      {showTop ? (
        <button
          type="button"
          className="fixed bottom-6 left-6 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface-elevated/90 text-ink shadow-lg backdrop-blur transition hover:border-accent/40 hover:text-accent"
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <ArrowUp className="h-4 w-4" />
        </button>
      ) : null}
    </footer>
  );
}
