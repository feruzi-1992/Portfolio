import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import feruziPhoto from '@/assets/feruzi.jpg';
import { siteConfig } from '@/lib/siteConfig';

export function HeroVisual({
  alt,
  portraitUrl,
}: {
  alt?: string;
  portraitUrl?: string;
}) {
  const reduce = useReducedMotion();
  const preferred = portraitUrl?.trim() ? portraitUrl.trim() : feruziPhoto;
  const [src, setSrc] = useState(preferred);

  useEffect(() => {
    setSrc(preferred);
  }, [preferred]);

  return (
    <div className="relative mx-auto w-full max-w-sm sm:max-w-md">
      <div className="absolute -inset-10 rounded-full bg-accent/15 blur-3xl" aria-hidden />

      <motion.figure
        className="relative"
        initial={reduce ? false : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="overflow-hidden rounded-[1.75rem] border border-border bg-surface-elevated shadow-[0_30px_80px_rgba(0,0,0,0.4)]">
          <img
            src={src}
            alt={alt || 'Mohammed Feruzi — Software Developer'}
            className="block h-auto w-full object-cover object-top"
            width={702}
            height={1296}
            loading="eager"
            decoding="async"
            onError={() => setSrc(feruziPhoto)}
          />
        </div>

        <figcaption className="mt-4 text-center sm:text-left">
          <p className="text-display text-lg font-bold text-ink sm:text-xl">{siteConfig.name}</p>
          <p className="mt-0.5 text-sm font-medium text-accent">Software Developer · CEO & Founder</p>
          <p className="mt-0.5 text-xs text-ink-muted">PrimoSoftware</p>
        </figcaption>
      </motion.figure>
    </div>
  );
}
