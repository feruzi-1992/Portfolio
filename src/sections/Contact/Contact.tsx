import { useState } from 'react';
import type { FormEvent } from 'react';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { siteConfig } from '@/lib/siteConfig';
import { mailtoFallback, submitContactMessage } from '@/lib/api';
import { SectionTitle } from '@/components/SectionTitle/SectionTitle';
import { Button } from '@/components/Button/Button';
import { Reveal } from '@/components/Reveal';
import { GithubIcon, LinkedinIcon } from '@/components/icons/BrandIcons';
import { hasUrl } from '@/utils/cn';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export function Contact() {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formEl = e.currentTarget;
    const form = new FormData(formEl);
    const payload = {
      name: String(form.get('name') || '').trim(),
      email: String(form.get('email') || '').trim(),
      subject: String(form.get('subject') || '').trim(),
      message: String(form.get('message') || '').trim(),
    };

    setStatus('loading');
    setFeedback('');

    try {
      const result = await submitContactMessage(payload);
      setStatus('success');
      setFeedback(result.message);
      formEl.reset();
    } catch (err) {
      if (hasUrl(siteConfig.email)) {
        mailtoFallback(payload);
        setStatus('error');
        setFeedback('API haikufikiwa — email client imefunguliwa kama fallback.');
      } else {
        setStatus('error');
        setFeedback(err instanceof Error ? err.message : 'Failed to send message.');
      }
    }
  };

  return (
    <section className="section-pad">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(125,211,252,0.08),transparent_55%)]" aria-hidden />
      <div className="container-page relative">
        <Reveal>
          <SectionTitle
            eyebrow="Contact"
            title="Let’s build something useful together."
            description="Share a project idea, collaboration request, or software need — I’ll get back to you."
          />
        </Reveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <div className="space-y-3 rounded-[1.75rem] border border-border bg-surface-elevated/50 p-6">
              <ContactRow
                icon={Mail}
                label="Email"
                value={hasUrl(siteConfig.email) ? siteConfig.email : 'Add VITE_EMAIL'}
                href={hasUrl(siteConfig.email) ? `mailto:${siteConfig.email}` : undefined}
              />
              <ContactRow
                icon={Phone}
                label="Phone"
                value={hasUrl(siteConfig.phone) ? siteConfig.phone : 'Add VITE_PHONE'}
                href={hasUrl(siteConfig.phone) ? `tel:${siteConfig.phone}` : undefined}
              />
              <ContactRow
                icon={GithubIcon}
                label="GitHub"
                value={hasUrl(siteConfig.github) ? siteConfig.github : 'Add VITE_GITHUB_URL'}
                href={hasUrl(siteConfig.github) ? siteConfig.github : undefined}
              />
              <ContactRow
                icon={LinkedinIcon}
                label="LinkedIn"
                value={hasUrl(siteConfig.linkedin) ? siteConfig.linkedin : 'Add VITE_LINKEDIN_URL'}
                href={hasUrl(siteConfig.linkedin) ? siteConfig.linkedin : undefined}
              />
              <ContactRow icon={MapPin} label="Location" value={siteConfig.location} />
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <form
              onSubmit={handleSubmit}
              className="rounded-[1.75rem] border border-border bg-surface-elevated/50 p-6 sm:p-8"
              noValidate
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Name" id="name" name="name" required autoComplete="name" />
                <Field
                  label="Email"
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                />
              </div>
              <div className="mt-4">
                <Field label="Subject" id="subject" name="subject" required />
              </div>
              <div className="mt-4">
                <label htmlFor="message" className="mb-2 block text-sm font-medium text-ink">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="field-input min-h-[150px] resize-y"
                />
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Button type="submit" disabled={status === 'loading'}>
                  <Send className="h-4 w-4" aria-hidden />
                  {status === 'loading' ? 'Sending…' : 'Send Message'}
                </Button>
                {feedback ? (
                  <p
                    className={
                      status === 'success'
                        ? 'text-sm text-emerald-300'
                        : 'text-sm text-amber-300'
                    }
                    role="status"
                  >
                    {feedback}
                  </p>
                ) : null}
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  id,
  ...props
}: {
  label: string;
  id: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-ink">
        {label}
      </label>
      <input id={id} className="field-input" {...props} />
    </div>
  );
}

function ContactRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: typeof Mail | typeof GithubIcon | typeof LinkedinIcon;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <>
      <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-surface text-accent">
        <Icon className="h-4 w-4" aria-hidden />
      </span>
      <span>
        <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-faint">
          {label}
        </span>
        <span className="text-sm text-ink break-all">{value}</span>
      </span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        className="flex items-center gap-3 rounded-2xl border border-border bg-surface/40 px-3.5 py-3.5 transition hover:border-accent/30"
      >
        {content}
      </a>
    );
  }

  return (
    <div className="flex items-center gap-3 rounded-2xl border border-dashed border-border bg-surface/30 px-3.5 py-3.5">
      {content}
    </div>
  );
}
