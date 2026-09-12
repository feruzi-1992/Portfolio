import type { Service } from '@/types';

export const services: Service[] = [
  {
    id: 'whatsapp-ai',
    title: 'WhatsApp AI Chatbot',
    description:
      'Automatic WhatsApp chat systems for FAQs, sales, bookings, follow-ups and 24/7 customer support.',
    icon: 'bot',
  },
  {
    id: 'web-apps',
    title: 'Web Application Development',
    description: 'Custom web applications designed for business requirements.',
    icon: 'globe',
  },
  {
    id: 'saas',
    title: 'SaaS Development',
    description:
      'Multi-tenant SaaS platforms with authentication, subscriptions, RBAC and scalable architecture.',
    icon: 'cloud',
  },
  {
    id: 'business',
    title: 'Business Management Systems',
    description: 'Systems for managing business operations, employees, finances and customers.',
    icon: 'briefcase',
  },
  {
    id: 'hr',
    title: 'HR Systems',
    description:
      'Human Resource Management systems including employees, attendance, leave and payroll.',
    icon: 'users',
  },
  {
    id: 'education',
    title: 'Education Systems',
    description: 'Student management, results, fees and academic administration systems.',
    icon: 'graduation',
  },
  {
    id: 'api',
    title: 'API & System Integration',
    description: 'REST APIs, payment integrations and third-party system integrations.',
    icon: 'plug',
  },
];
