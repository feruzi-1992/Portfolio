import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { fetchPublicSettings, type PublicSettings } from '@/lib/api';
import { defaultHomeContent, normalizeHomeContent } from '@/lib/homeContent';

const defaults: PublicSettings = {
  whatsapp_float_enabled: true,
  whatsapp_number: '255658489683',
  whatsapp_message: 'Habari Developer Feruzi, ninahitaji WhatsApp AI Chatbot / software help.',
  chatbot_cta_enabled: true,
  help_rail_enabled: true,
  demo_promo_enabled: true,
  demo_url: 'https://primosoft.co.tz/register',
  site_title: 'Portfolio · Mohammed Feruzi',
  page_home_enabled: true,
  page_about_enabled: true,
  page_skills_enabled: true,
  page_services_enabled: true,
  page_process_enabled: true,
  page_projects_enabled: true,
  page_experience_enabled: true,
  page_contact_enabled: true,
  home_content: defaultHomeContent,
};

interface SettingsContextValue {
  settings: PublicSettings;
  loading: boolean;
  refresh: () => Promise<void>;
  setSettingsLocal: (next: PublicSettings) => void;
}

const SettingsContext = createContext<SettingsContextValue | null>(null);

export function SiteSettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<PublicSettings>(defaults);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const data = await fetchPublicSettings();
      setSettings({
        ...defaults,
        ...data,
        home_content: normalizeHomeContent(data.home_content),
      });
    } catch {
      // Keep defaults if API is offline
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const value = useMemo(
    () => ({
      settings,
      loading,
      refresh,
      setSettingsLocal: setSettings,
    }),
    [settings, loading, refresh],
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSiteSettings(): SettingsContextValue {
  const ctx = useContext(SettingsContext);
  if (!ctx) {
    throw new Error('useSiteSettings must be used within SiteSettingsProvider');
  }
  return ctx;
}
