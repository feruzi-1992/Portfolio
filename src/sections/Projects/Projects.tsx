import { useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { projects, projectFilters } from '@/data/projects';
import type { Project } from '@/types';
import { SectionTitle } from '@/components/SectionTitle/SectionTitle';
import { ProjectCard } from '@/components/ProjectCard/ProjectCard';
import { ProjectModal } from '@/components/ProjectCard/ProjectModal';
import { Reveal } from '@/components/Reveal';
import { cn } from '@/utils/cn';

export function Projects() {
  const [filter, setFilter] = useState<(typeof projectFilters)[number]>('All');
  const [active, setActive] = useState<Project | null>(null);
  const reduce = useReducedMotion();

  const filtered = useMemo(() => {
    if (filter === 'All') return projects;
    return projects.filter((p) => p.category === filter);
  }, [filter]);

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <section className="section-pad bg-surface-muted/40">
      <div className="container-page">
        <Reveal>
          <SectionTitle
            eyebrow="Our Portfolio"
            title="Selected work with live URLs."
            description="Filter by category and open projects with live demos — real systems built for education, business, and digital products."
          />
        </Reveal>

        <Reveal delay={0.05}>
          <div
            className="mt-10 flex flex-wrap gap-2"
            role="tablist"
            aria-label="Filter projects by category"
          >
            {projectFilters.map((item) => (
              <button
                key={item}
                type="button"
                role="tab"
                aria-selected={filter === item}
                className={cn(
                  'rounded-full px-4 py-2 text-sm font-medium transition',
                  filter === item
                    ? 'bg-accent text-surface shadow-[0_8px_30px_rgba(125,211,252,0.2)]'
                    : 'border border-border bg-surface-elevated/40 text-ink-muted hover:border-accent/30 hover:text-accent',
                )}
                onClick={() => setFilter(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-10 space-y-5">
          <AnimatePresence mode="popLayout">
            {featured ? (
              <motion.div
                key={`featured-${featured.id}`}
                layout
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0 }}
                transition={{ duration: 0.35 }}
              >
                <ProjectCard
                  project={featured}
                  index={0}
                  featured
                  onOpen={setActive}
                />
              </motion.div>
            ) : null}

            <motion.div layout className="grid gap-5 md:grid-cols-2">
              {rest.map((project, i) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={reduce ? false : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProjectCard project={project} index={i + 1} onOpen={setActive} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </section>
  );
}
