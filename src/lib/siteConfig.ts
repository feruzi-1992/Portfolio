import type { SiteConfig } from '@/types';

/**
 * Central site configuration.
 * Prefer environment variables for personal contact details.
 */
export const siteConfig: SiteConfig = {
  name: 'Mohammed Feruzi',
  brand: 'Portfolio',
  title: 'Software Developer | ICT Professional | SaaS Developer',
  tagline: 'Building modern software solutions.',
  email: import.meta.env.VITE_EMAIL || '',
  phone: import.meta.env.VITE_PHONE || '',
  github: import.meta.env.VITE_GITHUB_URL || '',
  linkedin: import.meta.env.VITE_LINKEDIN_URL || '',
  location: import.meta.env.VITE_LOCATION || 'Tanzania',
  cvUrl: import.meta.env.VITE_CV_URL || '',
  seo: {
    title: 'Portfolio · Mohammed Feruzi | Software Developer',
    description:
      'Portfolio of Mohammed Feruzi, software developer focused on SaaS platforms, web applications, business systems and modern software solutions.',
  },
};

export const brandLabel = `${siteConfig.brand} · ${siteConfig.name}`;

export const GITHUB_URL = siteConfig.github || 'YOUR_GITHUB_URL';

export const navItems = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Skills', path: '/skills' },
  { label: 'Services', path: '/services' },
  { label: 'Process', path: '/process' },
  { label: 'Projects', path: '/projects' },
  { label: 'Experience', path: '/experience' },
  { label: 'Contact', path: '/contact' },
] as const;

export const trustIndicators = [
  'WhatsApp AI Chatbot',
  'Software Development',
  'SaaS Architecture',
  'Business Systems',
  'API Development',
] as const;

export const aboutHighlights = [
  'Problem Solving',
  'System Architecture',
  'Backend Development',
  'Frontend Development',
  'Database Design',
  'API Integration',
  'SaaS Development',
] as const;

export const focusAreas = [
  'Web Application Development',
  'SaaS Development',
  'Business Management Systems',
  'Student Management Systems',
  'HR Management Systems',
  'Financial Management Systems',
  'API Development',
  'Database Systems',
  'System Integration',
] as const;
