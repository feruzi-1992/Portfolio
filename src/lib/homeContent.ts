export interface HomeContent {
  eyebrow: string;
  headline: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  exploreLabel: string;
  imageAlt: string;
  /** Portrait URL — default from primosoft.co.tz */
  portraitUrl: string;
  trustIndicators: string[];
}

export const defaultHomeContent: HomeContent = {
  eyebrow: 'Portfolio · Mohammed Feruzi',
  headline: 'Building Digital Experiences That Solve Real Problems.',
  subtitle:
    'I am Mohammed Feruzi, a full-stack software developer specializing in modern web applications, business systems, APIs, and scalable software solutions for organizations and businesses.',
  ctaPrimary: 'View My Work',
  ctaSecondary: "Let's Work Together",
  exploreLabel: 'Explore',
  imageAlt: 'Mohammed Feruzi — Software Developer',
  /** Empty = bundled local photo in /public/feruzi.jpg */
  portraitUrl: '',
  trustIndicators: [
    'WhatsApp AI Chatbot',
    'Software Development',
    'SaaS Architecture',
    'Business Systems',
    'API Development',
  ],
};

/** Merge API/partial data with defaults so missing fields never break the UI */
export function normalizeHomeContent(input?: Partial<HomeContent> | null): HomeContent {
  const trust =
    Array.isArray(input?.trustIndicators) && input.trustIndicators.length > 0
      ? input.trustIndicators.map((t) => String(t).trim()).filter(Boolean)
      : defaultHomeContent.trustIndicators;

  return {
    eyebrow: (input?.eyebrow ?? defaultHomeContent.eyebrow).trim() || defaultHomeContent.eyebrow,
    headline: (input?.headline ?? defaultHomeContent.headline).trim() || defaultHomeContent.headline,
    subtitle: (input?.subtitle ?? defaultHomeContent.subtitle).trim() || defaultHomeContent.subtitle,
    ctaPrimary:
      (input?.ctaPrimary ?? defaultHomeContent.ctaPrimary).trim() || defaultHomeContent.ctaPrimary,
    ctaSecondary:
      (input?.ctaSecondary ?? defaultHomeContent.ctaSecondary).trim() ||
      defaultHomeContent.ctaSecondary,
    exploreLabel:
      (input?.exploreLabel ?? defaultHomeContent.exploreLabel).trim() ||
      defaultHomeContent.exploreLabel,
    imageAlt: (input?.imageAlt ?? defaultHomeContent.imageAlt).trim() || defaultHomeContent.imageAlt,
    portraitUrl:
      typeof input?.portraitUrl === 'string' ? input.portraitUrl.trim() : defaultHomeContent.portraitUrl,
    trustIndicators: trust,
  };
}
