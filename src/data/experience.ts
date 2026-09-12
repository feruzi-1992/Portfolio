import type { ExperienceItem } from '@/types';

/**
 * Experience entries are editable from this single file.
 * Do not invent employers or unverifiable dates.
 */
export const experience: ExperienceItem[] = [
  {
    id: 'primosoftware-dev',
    role: 'Software Developer',
    organization: 'Portfolio',
    period: 'Editable — add dates when ready',
    focus: [
      'Software Development',
      'SaaS Platforms',
      'Business Systems',
      'Database Systems',
      'API Development',
    ],
  },
];
