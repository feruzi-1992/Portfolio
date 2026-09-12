import { ArrowUpRight } from 'lucide-react';
import { siteConfig } from '@/lib/siteConfig';
import { ButtonLink } from '@/components/Button/Button';
import { GithubIcon } from '@/components/icons/BrandIcons';
import { Reveal } from '@/components/Reveal';
import { hasUrl } from '@/utils/cn';

export function GitHubSection() {
  const githubReady = hasUrl(siteConfig.github);

  return (
    <section className="section-pad pt-10 sm:pt-12">
      <div className="container-page">
        <Reveal>
          <div className="overflow-hidden rounded-[2rem] border border-border bg-gradient-to-br from-surface-elevated via-surface to-surface-muted px-6 py-12 sm:px-10">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-xl">
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-accent-soft text-accent">
                  <GithubIcon className="h-6 w-6" aria-hidden />
                </div>
                <h2 className="text-display text-3xl font-semibold tracking-tight text-ink">
                  Explore My Code
                </h2>
                <p className="mt-3 text-base leading-relaxed text-ink-muted">
                  Explore my projects, experiments and software development work on GitHub.
                </p>
                {!githubReady ? (
                  <p className="mt-3 text-sm text-amber-300/90">
                    Placeholder: set <code className="font-mono">VITE_GITHUB_URL</code> in{' '}
                    <code className="font-mono">.env</code>.
                  </p>
                ) : null}
              </div>

              {githubReady ? (
                <ButtonLink
                  href={siteConfig.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit GitHub
                  <ArrowUpRight className="h-4 w-4" aria-hidden />
                </ButtonLink>
              ) : (
                <span className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm text-ink-faint">
                  Visit GitHub — Coming Soon
                </span>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
