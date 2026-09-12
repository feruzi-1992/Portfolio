export type ProjectCategory = 'Web' | 'Chatbot' | 'SaaS' | 'Web Apps' | 'Education' | 'Business' | 'Finance';

export type ProjectStatus = 'Under Development' | 'In Progress' | 'Completed' | 'Coming Soon';

export interface Project {
  id: string;
  name: string;
  category: ProjectCategory;
  shortDescription: string;
  overview: string;
  problem: string;
  solution: string;
  technologies: string[];
  features: string[];
  architecture: string;
  challenges: string;
  status: ProjectStatus;
  github: string;
  demo: string;
  screenshots: string[];
}

export interface SkillGroup {
  category: string;
  skills: string[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  focus: string[];
}

export interface NavItem {
  label: string;
  href: string;
}

export interface SiteConfig {
  name: string;
  brand: string;
  title: string;
  tagline: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  location: string;
  cvUrl: string;
  seo: {
    title: string;
    description: string;
  };
}
