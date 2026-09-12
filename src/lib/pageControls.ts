/** Page keys controlled from Admin Front Control */
export const pageControlKeys = [
  'page_home_enabled',
  'page_about_enabled',
  'page_skills_enabled',
  'page_services_enabled',
  'page_process_enabled',
  'page_projects_enabled',
  'page_experience_enabled',
  'page_contact_enabled',
] as const;

export type PageControlKey = (typeof pageControlKeys)[number];

export const pageControlsMeta: Array<{
  key: PageControlKey;
  label: string;
  path: string;
  description: string;
}> = [
  {
    key: 'page_home_enabled',
    label: 'Home',
    path: '/',
    description: 'Hero page / button ya Home kwenye navbar',
  },
  {
    key: 'page_about_enabled',
    label: 'About',
    path: '/about',
    description: 'About page / button ya About',
  },
  {
    key: 'page_skills_enabled',
    label: 'Skills',
    path: '/skills',
    description: 'Skills & technology stack page',
  },
  {
    key: 'page_services_enabled',
    label: 'Services',
    path: '/services',
    description: 'Services page / button ya Services',
  },
  {
    key: 'page_process_enabled',
    label: 'Process',
    path: '/process',
    description: 'How it works / Process page',
  },
  {
    key: 'page_projects_enabled',
    label: 'Projects',
    path: '/projects',
    description: 'Portfolio projects page',
  },
  {
    key: 'page_experience_enabled',
    label: 'Experience',
    path: '/experience',
    description: 'Experience / journey page',
  },
  {
    key: 'page_contact_enabled',
    label: 'Contact',
    path: '/contact',
    description: 'Contact form page / Let’s Talk button',
  },
];

export function pathToPageKey(path: string): PageControlKey | null {
  const found = pageControlsMeta.find((p) => p.path === path);
  return found?.key ?? null;
}

type PageFlags = Record<PageControlKey, boolean>;

export function isPageEnabled(path: string, settings: PageFlags): boolean {
  const key = pathToPageKey(path);
  if (!key) return true;
  return settings[key] !== false;
}

export function filterNavBySettings<T extends { path: string }>(
  items: readonly T[],
  settings: PageFlags,
): T[] {
  return items.filter((item) => isPageEnabled(item.path, settings));
}

/** First enabled public page — used when Home is off or as fallback redirect */
export function firstEnabledPath(settings: PageFlags): string {
  for (const page of pageControlsMeta) {
    if (settings[page.key] !== false) return page.path;
  }
  return '/';
}
