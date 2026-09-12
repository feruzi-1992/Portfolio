import { MessageCircle } from 'lucide-react';
import { buildWhatsAppUrl } from '@/lib/api';
import { useSiteSettings } from '@/hooks/useSiteSettings';

export function WhatsAppFloat() {
  const { settings } = useSiteSettings();

  if (!settings.whatsapp_float_enabled || !settings.whatsapp_number) {
    return null;
  }

  const href = buildWhatsAppUrl(settings.whatsapp_number, settings.whatsapp_message);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-40 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-[0_12px_40px_rgba(37,211,102,0.35)] transition hover:-translate-y-0.5 hover:bg-[#1ebe57] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-5 w-5" aria-hidden />
      <span className="hidden sm:inline">WhatsApp AI</span>
    </a>
  );
}
