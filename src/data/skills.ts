import type { SkillGroup } from '@/types';

export const skillGroups: SkillGroup[] = [
  {
    category: 'Frontend',
    skills: ['React', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Bootstrap', 'Tailwind CSS'],
  },
  {
    category: 'Backend',
    skills: ['Java', 'Spring Boot', 'PHP', 'Laravel', 'Python', 'REST APIs'],
  },
  {
    category: 'Database',
    skills: ['PostgreSQL', 'MySQL', 'SQL'],
  },
  {
    category: 'Mobile',
    skills: ['Flutter', 'Dart'],
  },
  {
    category: 'Tools',
    skills: ['Git', 'GitHub', 'Docker', 'Linux', 'REST API', 'CI/CD', 'WhatsApp API', 'AI Chatbot'],
  },
];

export const technologyStack = [
  {
    group: 'Frontend',
    items: ['React', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Bootstrap'],
  },
  {
    group: 'Backend',
    items: ['Java', 'Spring Boot', 'PHP', 'Laravel', 'Python', 'REST APIs'],
  },
  {
    group: 'Database',
    items: ['PostgreSQL', 'MySQL', 'SQL'],
  },
  {
    group: 'Mobile',
    items: ['Flutter', 'Dart'],
  },
  {
    group: 'DevOps',
    items: ['Docker', 'Linux', 'CI/CD'],
  },
  {
    group: 'Tools',
    items: ['Git', 'GitHub'],
  },
] as const;
