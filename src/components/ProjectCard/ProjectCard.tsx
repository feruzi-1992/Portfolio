import { ExternalLink } from 'lucide-react';
import type { Project } from '@/types';
import { Button, ButtonLink } from '@/components/Button/Button';
import { GithubIcon } from '@/components/icons/BrandIcons';
import { hasUrl } from '@/utils/cn';
import { cn } from '@/utils/cn';

interface ProjectCardProps {
  project: Project;
  index: number;
  featured?: boolean;
  onOpen: (project: Project) => void;
}

export function ProjectCard({ project, index, featured = false, onOpen }: ProjectCardProps) {
  return (
    <article
      className={cn(
        'group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-border bg-surface-elevated/50 transition duration-500 hover:-translate-y-1 hover:border-accent/30 hover:bg-surface-elevated',
        featured && 'lg:min-h-[28rem]',
      )}
    >
      <div
        className={cn(
          'relative overflow-hidden border-b border-border bg-surface',
          featured ? 'min-h-[220px] sm:min-h-[280px]' : 'min-h-[160px]',
        )}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(125,211,252,0.18),transparent_55%),radial-gradient(circle_at_80%_80%,rgba(167,139,250,0.14),transparent_45%)]" />
        <div className="absolute inset-0 grid-noise opacity-50" />
        <div className="absolute inset-0 flex items-end justify-between p-5 sm:p-6">
          <span className="rounded-full border border-border bg-surface/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-ink-muted backdrop-blur">
            {project.category}
          </span>
          <span className="font-mono text-xs text-ink-faint">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[60%]">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-display text-lg font-bold text-accent backdrop-blur sm:h-20 sm:w-20 sm:text-xl">
            {project.name.slice(0, 2).toUpperCase()}
          </div>
        </div>
      </div>

      <div className={cn('flex flex-1 flex-col p-6', featured && 'sm:p-8')}>
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-accent-soft px-2.5 py-1 text-[11px] font-semibold text-accent">
            {project.status}
          </span>
        </div>

        <h3
          className={cn(
            'text-display font-semibold text-ink',
            featured ? 'text-2xl sm:text-3xl' : 'text-xl',
          )}
        >
          {project.name}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted sm:text-[15px]">
          {project.shortDescription}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.technologies.slice(0, featured ? 5 : 4).map((tech) => (
            <span
              key={tech}
              className="rounded-lg bg-surface px-2.5 py-1 text-[11px] font-medium text-ink-muted ring-1 ring-border"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-7 flex flex-wrap gap-2">
          <Button type="button" size="sm" onClick={() => onOpen(project)}>
            Case study
          </Button>
          {hasUrl(project.demo) ? (
            <ButtonLink
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              size="sm"
            >
              <ExternalLink className="h-3.5 w-3.5" aria-hidden />
              View live
            </ButtonLink>
          ) : null}
          {hasUrl(project.github) ? (
            <ButtonLink
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              variant="ghost"
              size="sm"
            >
              <GithubIcon className="h-3.5 w-3.5" aria-hidden />
              GitHub
            </ButtonLink>
          ) : null}
        </div>
      </div>
    </article>
  );
}
