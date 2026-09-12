import { siteConfig } from '@/lib/siteConfig';
import type { HomeContent } from '@/lib/homeContent';
import { normalizeHomeContent } from '@/lib/homeContent';

/** API base for XAMPP local hosting. Override with VITE_API_URL in .env */
export function getApiBaseUrl(): string {
  const fromEnv = import.meta.env.VITE_API_URL?.trim();
  if (fromEnv) return fromEnv.replace(/\/$/, '');

  if (typeof window !== 'undefined') {
    const { protocol, hostname, port } = window.location;
    if (port === '5173' || port === '4173') {
      return `${protocol}//${hostname}/Portfolio/api`;
    }
  }

  return '/Portfolio/api';
}

export interface PublicSettings {
  whatsapp_float_enabled: boolean;
  whatsapp_number: string;
  whatsapp_message: string;
  chatbot_cta_enabled: boolean;
  help_rail_enabled: boolean;
  demo_promo_enabled: boolean;
  demo_url: string;
  site_title: string;
  page_home_enabled: boolean;
  page_about_enabled: boolean;
  page_skills_enabled: boolean;
  page_services_enabled: boolean;
  page_process_enabled: boolean;
  page_projects_enabled: boolean;
  page_experience_enabled: boolean;
  page_contact_enabled: boolean;
  home_content: HomeContent;
}

export interface ContactMessageRow {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  ip_address: string | null;
  created_at: string;
}

const TOKEN_KEY = 'portfolio_admin_token';

export function getAdminToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setAdminToken(token: string | null): void {
  if (!token) localStorage.removeItem(TOKEN_KEY);
  else localStorage.setItem(TOKEN_KEY, token);
}

async function parseJson<T>(response: Response): Promise<T> {
  return (await response.json().catch(() => ({}))) as T;
}

function withNormalizedHome(settings: PublicSettings): PublicSettings {
  return {
    ...settings,
    home_content: normalizeHomeContent(settings.home_content),
  };
}

export async function fetchPublicSettings(): Promise<PublicSettings> {
  const response = await fetch(`${getApiBaseUrl()}/settings.php`);
  const data = await parseJson<{ success?: boolean; settings?: PublicSettings; message?: string }>(
    response,
  );
  if (!response.ok || !data.success || !data.settings) {
    throw new Error(data.message || 'Failed to load settings');
  }
  return withNormalizedHome(data.settings);
}

export async function adminLogin(username: string, password: string): Promise<string> {
  const response = await fetch(`${getApiBaseUrl()}/admin/login.php`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  const data = await parseJson<{ success?: boolean; token?: string; message?: string }>(response);
  if (!response.ok || !data.success || !data.token) {
    throw new Error(data.message || 'Login failed');
  }
  setAdminToken(data.token);
  return data.token;
}

export async function adminLogout(): Promise<void> {
  const token = getAdminToken();
  if (!token) return;
  await fetch(`${getApiBaseUrl()}/admin/logout.php`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).catch(() => undefined);
  setAdminToken(null);
}

export async function fetchAdminSettings(): Promise<PublicSettings> {
  const token = getAdminToken();
  if (!token) throw new Error('Unauthorized');
  const response = await fetch(`${getApiBaseUrl()}/admin/settings.php`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await parseJson<{ success?: boolean; settings?: PublicSettings; message?: string }>(
    response,
  );
  if (!response.ok || !data.success || !data.settings) {
    throw new Error(data.message || 'Failed to load admin settings');
  }
  return withNormalizedHome(data.settings);
}

export async function saveAdminSettings(payload: Partial<PublicSettings>): Promise<PublicSettings> {
  const token = getAdminToken();
  if (!token) throw new Error('Unauthorized');
  const response = await fetch(`${getApiBaseUrl()}/admin/settings.php`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  const data = await parseJson<{ success?: boolean; settings?: PublicSettings; message?: string }>(
    response,
  );
  if (!response.ok || !data.success || !data.settings) {
    throw new Error(data.message || 'Failed to save settings');
  }
  return withNormalizedHome(data.settings);
}

export async function fetchAdminMessages(): Promise<ContactMessageRow[]> {
  const token = getAdminToken();
  if (!token) throw new Error('Unauthorized');
  const response = await fetch(`${getApiBaseUrl()}/admin/messages.php`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await parseJson<{
    success?: boolean;
    messages?: ContactMessageRow[];
    message?: string;
  }>(response);
  if (!response.ok || !data.success) {
    throw new Error(data.message || 'Failed to load messages');
  }
  return data.messages || [];
}

export async function submitContactMessage(payload: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): Promise<{ success: boolean; message: string }> {
  const response = await fetch(`${getApiBaseUrl()}/contact.php`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = await parseJson<{ success?: boolean; message?: string }>(response);

  if (!response.ok || !data?.success) {
    throw new Error(data?.message || 'Failed to send message.');
  }

  return {
    success: true,
    message: data.message || 'Message saved successfully.',
  };
}

export function mailtoFallback(payload: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): void {
  if (!siteConfig.email) return;
  const body = [`Name: ${payload.name}`, `Email: ${payload.email}`, '', payload.message].join('\n');
  window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent(payload.subject)}&body=${encodeURIComponent(body)}`;
}

export function buildWhatsAppUrl(number: string, message: string): string {
  const cleaned = number.replace(/\D+/g, '');
  const text = encodeURIComponent(message || '');
  return `https://wa.me/${cleaned}${text ? `?text=${text}` : ''}`;
}
