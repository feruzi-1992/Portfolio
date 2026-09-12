import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import {
  Bot,
  Headphones,
  Mail,
  MessageCircle,
  Phone,
  Rocket,
  X,
} from 'lucide-react';
import { buildWhatsAppUrl } from '@/lib/api';
import { useSiteSettings } from '@/hooks/useSiteSettings';
import { siteConfig } from '@/lib/siteConfig';
import { hasUrl, cn } from '@/utils/cn';

type Panel = 'none' | 'help' | 'ai';

const DEMO_URL = 'https://primosoft.co.tz/register';

const aiReplies: Array<{ q: RegExp; a: string }> = [
  {
    q: /demo|jaribio|bure|pos|stock|sms|risiti/i,
    a: 'Unaweza kuanza demo bure ya siku 7 (POS, stock, risiti za SMS) kupitia PrimoSoftware — bofya “Anza demo bure”.',
  },
  {
    q: /whatsapp|chatbot|bot|ai/i,
    a: 'Ninaweza kukusaidia na WhatsApp AI Chatbot: auto-reply, FAQs, booking na support. Andika “WhatsApp” au fungua Chat on WhatsApp.',
  },
  {
    q: /bei|price|gharama|quote/i,
    a: 'Bei hutegemea mahitaji. Tuambie biashara yako kwa WhatsApp au Contact form — Developer Feruzi atakupa quote.',
  },
  {
    q: /hujambo|habari|hello|hi/i,
    a: 'Habari! Karibu Portfolio ya Developer Feruzi. Unaweza kuuliza kuhusu chatbot, miradi, au demo ya PrimoSoftware POS.',
  },
];

export function HelpRail() {
  const { settings } = useSiteSettings();
  const [panel, setPanel] = useState<Panel>('none');
  const [aiInput, setAiInput] = useState('');
  const [aiMessages, setAiMessages] = useState<Array<{ role: 'bot' | 'user'; text: string }>>([
    {
      role: 'bot',
      text: 'Habari! Mimi ni msaidizi wa Portfolio. Uliza kuhusu WhatsApp AI, miradi, au demo ya PrimoSoftware.',
    },
  ]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const waHref = buildWhatsAppUrl(
    settings.whatsapp_number || '255768481766',
    settings.whatsapp_message || 'Habari, nahitaji msaada.',
  );

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [aiMessages, panel]);

  if (!settings.help_rail_enabled) return null;

  const toggle = (next: Panel) => setPanel((p) => (p === next ? 'none' : next));

  const sendAi = () => {
    const text = aiInput.trim();
    if (!text) return;
    const match = aiReplies.find((r) => r.q.test(text));
    const reply =
      match?.a ||
      'Asante. Kwa majibu ya haraka, tumia WhatsApp au Contact form — Developer Feruzi atakusaidia.';
    setAiMessages((prev) => [...prev, { role: 'user', text }, { role: 'bot', text: reply }]);
    setAiInput('');
  };

  return (
    <>
      {/* Right floating rail — PrimoSoftware style */}
      <aside
        className="fixed right-2 bottom-28 z-[45] flex flex-col items-end gap-2 sm:right-3 sm:bottom-32"
        aria-label="Quick help actions"
      >
        {settings.whatsapp_float_enabled && settings.whatsapp_number ? (
          <RailButton
            href={waHref}
            label="Chat on WhatsApp"
            iconClass="text-[#16a34a]"
            icon={<MessageCircle className="h-5 w-5" />}
          />
        ) : null}

        <RailButton
          label="Msaada / Help"
          iconClass="text-accent"
          icon={<Headphones className="h-5 w-5" />}
          onClick={() => toggle('help')}
          active={panel === 'help'}
        />

        <RailButton
          label="AI Chatbot"
          iconClass="text-violet-300"
          icon={<Bot className="h-5 w-5" />}
          onClick={() => toggle('ai')}
          active={panel === 'ai'}
        />
      </aside>

      {/* Help panel */}
      {panel === 'help' ? (
        <div
          className="fixed right-3 bottom-28 z-[46] w-[min(22rem,calc(100vw-1.5rem))] overflow-hidden rounded-2xl border border-border bg-surface-elevated shadow-2xl sm:right-14 sm:bottom-36"
          role="dialog"
          aria-label="Help and support"
        >
          <div className="flex items-start justify-between gap-3 bg-gradient-to-r from-sky-600 to-cyan-700 px-4 py-3 text-white">
            <div>
              <p className="font-semibold">Msaada & Support</p>
              <p className="text-xs text-white/85">Tuko online — tunawezaje kukusaidia?</p>
            </div>
            <button
              type="button"
              className="rounded-lg p-1 text-white/90 hover:bg-white/10"
              aria-label="Close help"
              onClick={() => setPanel('none')}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="space-y-2 p-4 text-sm">
            <p className="text-ink-muted">Chagua njia ya mawasiliano:</p>
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl bg-emerald-500/15 px-3 py-2.5 font-semibold text-emerald-300 transition hover:bg-emerald-500/25"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp — 0658489683
            </a>
            <a
              href="tel:0768481766"
              className="flex items-center gap-2 rounded-xl bg-sky-500/15 px-3 py-2.5 font-semibold text-sky-300 transition hover:bg-sky-500/25"
            >
              <Phone className="h-4 w-4" />
              Call — 0768481766
            </a>
            {hasUrl(siteConfig.email) ? (
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-2 rounded-xl bg-blue-500/15 px-3 py-2.5 font-semibold text-blue-300 transition hover:bg-blue-500/25"
              >
                <Mail className="h-4 w-4" />
                {siteConfig.email}
              </a>
            ) : null}
            {settings.page_contact_enabled ? (
              <Link
                to="/contact"
                onClick={() => setPanel('none')}
                className="flex items-center gap-2 rounded-xl bg-orange-500/15 px-3 py-2.5 font-semibold text-orange-200 transition hover:bg-orange-500/25"
              >
                Request / Contact form
              </Link>
            ) : null}
            <button
              type="button"
              className="flex w-full items-center gap-2 rounded-xl bg-violet-500/15 px-3 py-2.5 text-left font-semibold text-violet-200 transition hover:bg-violet-500/25"
              onClick={() => setPanel('ai')}
            >
              <Bot className="h-4 w-4" />
              Open AI Chatbot
            </button>
          </div>
        </div>
      ) : null}

      {/* AI chatbot panel */}
      {panel === 'ai' ? (
        <div
          className="fixed right-3 bottom-28 z-[46] flex max-h-[min(70vh,34rem)] w-[min(24rem,calc(100vw-1.5rem))] flex-col overflow-hidden rounded-2xl border border-border bg-surface-elevated shadow-2xl sm:right-14 sm:bottom-36"
          role="dialog"
          aria-label="AI Chatbot"
        >
          <div className="flex items-start justify-between gap-3 bg-gradient-to-r from-violet-600 to-indigo-700 px-4 py-3 text-white">
            <div>
              <p className="font-semibold">AI Chatbot</p>
              <p className="text-xs text-white/85">Portfolio assistant · Developer Feruzi</p>
            </div>
            <button
              type="button"
              className="rounded-lg p-1 text-white/90 hover:bg-white/10"
              aria-label="Close AI chat"
              onClick={() => setPanel('none')}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="flex flex-1 flex-col space-y-2 overflow-y-auto bg-surface/60 p-3">
            {aiMessages.map((m, i) => (
              <div
                key={`${m.role}-${i}`}
                className={cn(
                  'max-w-[88%] rounded-2xl px-3 py-2 text-[13px] leading-relaxed',
                  m.role === 'bot'
                    ? 'border border-border bg-surface-elevated text-ink'
                    : 'ml-auto bg-accent text-surface',
                )}
              >
                {m.text}
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
          <div className="flex gap-2 border-t border-border p-3">
            <input
              className="field-input flex-1"
              placeholder="Andika swali…"
              value={aiInput}
              onChange={(e) => setAiInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  sendAi();
                }
              }}
            />
            <ButtonLike onClick={sendAi}>Tuma</ButtonLike>
          </div>
        </div>
      ) : null}

      {/* PrimoSoftware free demo promo — like primosoft.co.tz */}
      {settings.demo_promo_enabled ? (
        <div className="fixed right-3 bottom-4 z-[44] w-[min(20rem,calc(100vw-1.5rem))] overflow-hidden rounded-2xl border border-border bg-surface-elevated/95 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:right-4">
          <div className="bg-gradient-to-r from-sky-700 to-cyan-600 px-4 py-2.5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/90">
              PrimoSoftware
            </p>
          </div>
          <div className="p-4">
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
                <Rocket className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <h3 className="text-display text-base font-semibold text-ink">Anza demo bure</h3>
                <p className="mt-1 text-xs leading-relaxed text-ink-muted">
                  Jaribio la siku 7 — POS, stock, risiti za SMS
                </p>
              </div>
            </div>
            <a
              href={settings.demo_url || DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-accent px-4 py-2.5 text-sm font-semibold text-surface transition hover:bg-accent-hover"
            >
              Anza demo bure
            </a>
          </div>
        </div>
      ) : null}
    </>
  );
}

function RailButton({
  label,
  icon,
  iconClass,
  href,
  onClick,
  active,
}: {
  label: string;
  icon: ReactNode;
  iconClass: string;
  href?: string;
  onClick?: () => void;
  active?: boolean;
}) {
  const className =
    'group flex items-center justify-end border-0 bg-transparent p-0 text-inherit no-underline';

  const inner = (
    <>
      <span className="flex h-10 max-w-0 items-center overflow-hidden whitespace-nowrap rounded-l-lg bg-gradient-to-r from-sky-600 to-cyan-700 text-xs font-bold text-white opacity-0 transition-all duration-250 group-hover:max-w-[12rem] group-hover:px-3 group-hover:opacity-100 group-focus-visible:max-w-[12rem] group-focus-visible:px-3 group-focus-visible:opacity-100">
        {label}
      </span>
      <span
        className={cn(
          'grid h-10 w-10 place-items-center rounded-full border border-border bg-surface-elevated shadow-lg transition',
          iconClass,
          active && 'ring-2 ring-accent/50',
        )}
      >
        {icon}
      </span>
    </>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className} aria-label={label}>
        {inner}
      </a>
    );
  }

  return (
    <button type="button" className={className} aria-label={label} aria-expanded={active} onClick={onClick}>
      {inner}
    </button>
  );
}

function ButtonLike({ children, onClick }: { children: ReactNode; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-surface hover:bg-accent-hover"
    >
      {children}
    </button>
  );
}
