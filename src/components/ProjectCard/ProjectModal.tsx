import { useEffect } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ExternalLink, X } from 'lucide-react';
import type { Project } from '@/types';
import { ButtonLink } from '@/components/Button/Button';
import { GithubIcon } from '@/components/icons/BrandIcons';
import { hasUrl } from '@/utils/cn';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project ? (
        <motion.div
          className="fixed inset-0 z-[80] flex items-end justify-center p-0 sm:items-center sm:p-6"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduce ? undefined : { opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
        >
          <button
            type="button"
            className="absolute inset-0 bg-ink/50 backdrop-blur-sm"
            aria-label="Close project details"
            onClick={onClose}
          />
          <motion.div
            className="relative z-10 max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-[1.75rem] border border-border bg-surface-elevated shadow-2xl sm:rounded-[1.75rem]"
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: 16 }}
            transition={{ duration: 0.28 }}
          >
            <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-border bg-surface-elevated/95 px-6 py-4 backdrop-blur">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                  {project.category} · {project.status}
                </p>
                <h3 id="project-modal-title" className="text-display mt-1 text-2xl font-semibold text-ink">
                  {project.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg p-2 text-ink-muted transition hover:bg-surface hover:text-ink"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-6 px-6 py-6">
              <Section label="Overview" text={project.overview} />
              <Section label="Problem" text={project.problem} />
              <Section label="Solution" text={project.solution} />

              <div>
                <h4 className="text-sm font-semibold text-ink">Main features</h4>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  {project.features.map((feature) => (
                    <li
                      key={feature}
                      className="rounded-lg border border-border bg-surface px-3 py-2 text-sm text-ink-muted"
                    >
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-ink">Technology stack</h4>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md bg-accent-soft px-2.5 py-1 text-xs font-medium text-accent"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <Section label="Architecture" text={project.architecture} />
              <Section label="Challenges" text={project.challenges} />

              <div>
                <h4 className="text-sm font-semibold text-ink">Screenshots</h4>
                {project.screenshots.length > 0 ? (
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    {project.screenshots.map((src) => (
                      <img
                        key={src}
                        src={src}
                        alt={`${project.name} screenshot`}
                        loading="lazy"
                        className="rounded-lg border border-border"
                      />
                    ))}
                  </div>
                ) : (
                  <p className="mt-2 rounded-lg border border-dashed border-border bg-surface px-4 py-6 text-sm text-ink-faint">
                    Screenshots placeholder — add images when available.
                  </p>
                )}
              </div>

              <div className="flex flex-wrap gap-2 border-t border-border pt-4">
                {hasUrl(project.github) ? (
                  <ButtonLink href={project.github} target="_blank" rel="noopener noreferrer" size="sm">
                    <GithubIcon className="h-3.5 w-3.5" />
                    GitHub
                  </ButtonLink>
                ) : (
                  <span className="text-sm text-ink-faint">GitHub — Coming Soon</span>
                )}
                {hasUrl(project.demo) ? (
                  <ButtonLink
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="secondary"
                    size="sm"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    View live
                  </ButtonLink>
                ) : (
                  <span className="text-sm text-ink-faint">Live Demo — Coming Soon</span>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function Section({ label, text }: { label: string; text: string }) {
  return (
    <div>
      <h4 className="text-sm font-semibold text-ink">{label}</h4>
      <p className="mt-2 text-sm leading-relaxed text-ink-muted">{text}</p>
    </div>
  );
}
