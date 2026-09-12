import type { Project } from '@/types';

/** Filters matching https://primosoftware.co.tz/Our%20Portfolio.php */
export const projectFilters = ['All', 'Web', 'Chatbot'] as const;

/**
 * Projects sourced from PrimoSoftware Our Portfolio (live URLs).
 * Duplicate SRS card on the live page is included once.
 */
export const projects: Project[] = [
  {
    id: 'whatsapp-ai-chatbot',
    name: 'WhatsApp AI Chatbot',
    category: 'Chatbot',
    shortDescription:
      'Automatic WhatsApp chat assistant for FAQs, bookings, sales follow-ups and customer support.',
    overview:
      'A WhatsApp AI chatbot system that replies automatically to customers, answers common questions, supports bookings/sales flows, and can hand off to a human agent when needed.',
    problem:
      'Businesses lose customers when chats are slow, unanswered after hours, or handled manually at scale.',
    solution:
      'An automated WhatsApp chatbot trained for the business language and workflows, available 24/7 with clear escalation to humans.',
    technologies: ['WhatsApp', 'AI Chatbot', 'API', 'PHP', 'Web'],
    features: [
      'Auto-reply',
      'FAQ answers',
      'Booking / sales flows',
      'SW & EN support',
      'Human handoff',
      '24/7 availability',
    ],
    architecture:
      'WhatsApp messaging channel connected to AI chatbot logic and business workflows via APIs.',
    challenges:
      'Keeping answers accurate, handling edge cases, and designing smooth handoff from bot to human support.',
    status: 'Completed',
    github: '',
    demo: '',
    screenshots: [],
  },
  {
    id: 'srs',
    name: 'SRS (Student Record System)',
    category: 'Web',
    shortDescription: 'Multi-college One platform',
    overview:
      'SRS is a multi-college Student Record System platform for managing academic records across institutions from one place.',
    problem:
      'Colleges need a shared, reliable system for student records instead of fragmented tools per campus.',
    solution:
      'A multi-college web platform that centralizes student record management with a live public portal.',
    technologies: ['Web', 'PHP', 'MySQL'],
    features: ['Multi-college platform', 'Student records', 'Institution administration', 'Live portal'],
    architecture: 'Web application deployed for multi-institution student record workflows.',
    challenges: 'Supporting multiple colleges on one platform while keeping records organized.',
    status: 'Completed',
    github: '',
    demo: 'https://srs.ac.tz/',
    screenshots: [],
  },
  {
    id: 'primosoftware-company',
    name: 'Primo Software Company',
    category: 'Web',
    shortDescription:
      'We are an ICT company in Tanzania that offers professional and affordable Information Technology solutions',
    overview:
      'The official PrimoSoftware company website presenting ICT services, products, and digital solutions in Tanzania.',
    problem: 'Businesses and institutions need a clear entry point to PrimoSoftware services and offerings.',
    solution: 'A professional company website with services, portfolio, and contact pathways.',
    technologies: ['Web', 'PHP', 'MySQL'],
    features: ['Company profile', 'Services', 'Portfolio', 'Contact & quotes'],
    architecture: 'Company marketing and services website hosted at primosoftware.co.tz.',
    challenges: 'Presenting a wide ICT service range clearly for clients and partners.',
    status: 'Completed',
    github: '',
    demo: 'https://primosoftware.co.tz/',
    screenshots: [],
  },
  {
    id: 'primosoft-duka',
    name: 'primosoft Duka',
    category: 'Web',
    shortDescription:
      'Sell smarter. Run your whole business. Fast checkout, real-time stock, accounting, and reports — built for shops.',
    overview:
      'primosoft Duka helps shops run sales, stock, accounting, and reporting in one business platform.',
    problem: 'Shop owners need faster checkout and clearer stock/accounting visibility day to day.',
    solution:
      'A business web platform with checkout, real-time stock, accounting, and operational reports.',
    technologies: ['Web', 'PHP', 'MySQL'],
    features: ['Fast checkout', 'Real-time stock', 'Accounting', 'Reports'],
    architecture: 'Business management web application for retail and shop operations.',
    challenges: 'Keeping inventory and sales data accurate during busy shop activity.',
    status: 'Completed',
    github: '',
    demo: 'https://primosoft.co.tz/',
    screenshots: [],
  },
  {
    id: 'lab2home',
    name: 'lab2homediagnostics',
    category: 'Web',
    shortDescription:
      'See your body as a story — not a clinic checklist. A premium view of lungs, heart, and kidneys powered by your bio data.',
    overview:
      'lab2homediagnostics presents health insights in a clearer, premium experience focused on lungs, heart, and kidneys.',
    problem: 'Clinic-style reports can be hard for people to understand as a full health story.',
    solution: 'A web experience that turns diagnostic data into a clearer, premium health view.',
    technologies: ['Web'],
    features: ['Health insights', 'Premium diagnostics view', 'Lungs / heart / kidneys focus'],
    architecture: 'Public-facing diagnostics web platform.',
    challenges: 'Communicating medical insights clearly without oversimplifying important details.',
    status: 'Completed',
    github: '',
    demo: 'https://lab2homediagnostics.co.tz/',
    screenshots: [],
  },
  {
    id: 'uca-teachers',
    name: 'UCA Teachers College',
    category: 'Web',
    shortDescription:
      'UCA Teachers College has fully registered by Ministry of Education (REG NO.E0684).',
    overview:
      'Institutional website for UCA Teachers College, a Ministry of Education registered teachers college.',
    problem: 'The college needs an official online presence for students, parents, and stakeholders.',
    solution: 'A college website presenting registration status, programs, and institutional information.',
    technologies: ['Web'],
    features: ['College profile', 'Registration information', 'Institutional communication'],
    architecture: 'Education institution website.',
    challenges: 'Keeping public college information clear and trustworthy for applicants and partners.',
    status: 'Completed',
    github: '',
    demo: 'https://uca.ac.tz/',
    screenshots: [],
  },
  {
    id: 'uca',
    name: 'Universal College of Africa (UCA)',
    category: 'Web',
    shortDescription:
      'Universal College of Africa (UCA) — information for students, parents, and stakeholders.',
    overview:
      'Website for Universal College of Africa supporting communication with students, parents, and stakeholders.',
    problem: 'The college needs a central digital channel for institutional communication.',
    solution: 'A public college website with information for academic stakeholders.',
    technologies: ['Web'],
    features: ['College information', 'Stakeholder communication', 'Public portal'],
    architecture: 'Education institution website.',
    challenges: 'Serving multiple audiences — students, parents, and partners — from one site.',
    status: 'Completed',
    github: '',
    demo: 'https://www.ucatz.ac.tz/',
    screenshots: [],
  },
  {
    id: 'srms',
    name: 'SRMS (Student Record Management System)',
    category: 'Web',
    shortDescription: 'Student Portal — results, payments, receipts and services.',
    overview:
      'SRMS provides a student portal for results, payments, receipts, and related academic services.',
    problem: 'Students need a single place to access results, payments, and service records.',
    solution: 'A student record management web system with portal access for key academic services.',
    technologies: ['Web', 'PHP', 'MySQL'],
    features: ['Student portal', 'Results', 'Payments', 'Receipts', 'Services'],
    architecture: 'Student-facing portal with academic and payment service workflows.',
    challenges: 'Connecting academic records with payment and receipt services reliably.',
    status: 'Completed',
    github: '',
    demo: 'https://srms.ac.tz/',
    screenshots: [],
  },
];
