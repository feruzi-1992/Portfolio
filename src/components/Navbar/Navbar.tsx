import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { GithubIcon } from '@/components/icons/BrandIcons';
import { brandLabel, navItems, siteConfig } from '@/lib/siteConfig';
import { useTheme } from '@/hooks/useTheme';
import { useSiteSettings } from '@/hooks/useSiteSettings';
import { filterNavBySettings, firstEnabledPath } from '@/lib/pageControls';
import { cn, hasUrl } from '@/utils/cn';

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { settings } = useSiteSettings();
  const visibleNav = filterNavBySettings(navItems, settings);
  const homePath = firstEnabledPath(settings);
  const showContactCta = settings.page_contact_enabled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      'relative rounded-full px-3.5 py-2 text-[13px] font-medium tracking-wide transition',
      isActive ? 'text-ink' : 'text-ink-muted hover:text-ink',
    );

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500',
        scrolled || open
          ? 'border-b border-border bg-surface/75 py-2.5 shadow-[0_10px_40px_rgba(0,0,0,0.25)] backdrop-blur-2xl'
          : 'bg-transparent py-5',
      )}
    >
      <nav className="container-page flex items-center justify-between" aria-label="Primary">
        <Link
          to={homePath}
          className="text-display text-lg font-bold tracking-tight text-ink"
          onClick={() => setOpen(false)}
          aria-label={brandLabel}
        >
          <span className="text-accent">{siteConfig.brand}</span>
          <span className="mx-1.5 text-ink-faint">·</span>
          <span className="text-[0.95rem] font-semibold text-ink/90">{siteConfig.name}</span>
        </Link>

        <div className="hidden items-center gap-0.5 rounded-full border border-border bg-surface-elevated/40 p-1 lg:flex">
          {visibleNav.map((item) => (
            <NavLink key={item.path} to={item.path} className={linkClass} end={item.path === '/'}>
              {({ isActive }) => (
                <>
                  {item.label}
                  {isActive ? (
                    <span className="absolute inset-x-2 -bottom-0.5 h-px bg-accent" aria-hidden />
                  ) : null}
                </>
              )}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {hasUrl(siteConfig.github) ? (
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-full p-2.5 text-ink-muted transition hover:bg-accent-soft hover:text-accent sm:inline-flex"
              aria-label="GitHub profile"
            >
              <GithubIcon className="h-4 w-4" />
            </a>
          ) : null}

          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-full p-2.5 text-ink-muted transition hover:bg-accent-soft hover:text-accent"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          {showContactCta ? (
            <Link
              to="/contact"
              className="hidden rounded-full bg-accent px-4 py-2 text-xs font-semibold text-surface transition hover:bg-accent-hover sm:inline-flex"
            >
              Let&apos;s Talk
            </Link>
          ) : null}

          <button
            type="button"
            className="rounded-full p-2.5 text-ink lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <div className={cn('border-t border-border bg-surface/95 lg:hidden', open ? 'block' : 'hidden')}>
        <div className="container-page flex flex-col gap-1 py-4">
          {visibleNav.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                cn(
                  'rounded-xl px-4 py-3 text-base font-medium',
                  isActive ? 'bg-accent-soft text-accent' : 'text-ink hover:bg-surface-elevated',
                )
              }
              onClick={() => setOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
          {showContactCta ? (
            <Link
              to="/contact"
              className="mt-2 inline-flex items-center justify-center rounded-full bg-accent px-5 py-3 text-sm font-semibold text-surface"
              onClick={() => setOpen(false)}
            >
              Let&apos;s Talk
            </Link>
          ) : null}
        </div>
      </div>
    </header>
  );
}
