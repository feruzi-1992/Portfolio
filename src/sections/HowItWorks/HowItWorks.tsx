import { Link } from 'react-router-dom';
import { Bot, MessageSquareText, Rocket, Settings2, ShieldCheck } from 'lucide-react';
import { SectionTitle } from '@/components/SectionTitle/SectionTitle';
import { Reveal } from '@/components/Reveal';
import { useSiteSettings } from '@/hooks/useSiteSettings';
import { buildWhatsAppUrl } from '@/lib/api';

const steps = [
  {
    icon: MessageSquareText,
    title: 'Discover',
    text: 'We map your customer questions, sales flow, bookings, and support needs.',
  },
  {
    icon: Settings2,
    title: 'Design flows',
    text: 'Chat scripts, menus, FAQs, and handoff to a human agent are planned clearly.',
  },
  {
    icon: Bot,
    title: 'Train AI chatbot',
    text: 'The bot is trained to answer in your business language (SW/EN) with useful actions.',
  },
  {
    icon: Rocket,
    title: 'Connect WhatsApp',
    text: 'The chatbot goes live on WhatsApp so customers get automatic replies 24/7.',
  },
  {
    icon: ShieldCheck,
    title: 'Support & improve',
    text: 'We monitor conversations, refine answers, and keep the system maintained.',
  },
];

export function HowItWorks() {
  const { settings } = useSiteSettings();
  const wa = buildWhatsAppUrl(settings.whatsapp_number, settings.whatsapp_message);

  return (
    <section className="section-pad bg-surface-muted/50">
      <div className="container-page">
        <Reveal>
          <SectionTitle
            eyebrow="How it works"
            title="From idea to WhatsApp AI chatbot — step by step."
            description="A clear delivery process for automatic WhatsApp chat systems that help customers and grow sales."
          />
        </Reveal>

        <div className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Reveal key={step.title} delay={index * 0.04}>
                <article className="h-full rounded-[1.5rem] border border-border bg-surface-elevated/50 p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-accent-soft text-accent">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <span className="font-mono text-[11px] text-ink-faint">0{index + 1}</span>
                  </div>
                  <h3 className="text-display text-lg font-semibold text-ink">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{step.text}</p>
                </article>
              </Reveal>
            );
          })}
        </div>

        {settings.chatbot_cta_enabled ? (
          <Reveal delay={0.1}>
            <div className="mt-12 flex flex-col items-start justify-between gap-4 rounded-[1.75rem] border border-border bg-surface-elevated/60 p-6 sm:flex-row sm:items-center sm:p-8">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
                  WhatsApp AI Chatbot
                </p>
                <h3 className="text-display mt-2 text-2xl font-semibold text-ink">
                  Ready to automate customer chats?
                </h3>
                <p className="mt-2 max-w-xl text-sm text-ink-muted">
                  Talk to Developer Feruzi on WhatsApp and get a chatbot that answers, books, and
                  supports customers automatically.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1ebe57]"
                >
                  Chat on WhatsApp
                </a>
                {settings.page_contact_enabled ? (
                  <Link
                    to="/contact"
                    className="inline-flex rounded-full border border-border px-5 py-3 text-sm font-semibold text-ink transition hover:border-accent/40 hover:bg-accent-soft"
                  >
                    Contact form
                  </Link>
                ) : null}
              </div>
            </div>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
