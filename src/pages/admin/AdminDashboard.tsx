import { useEffect, useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import {
  CheckCircle2,
  ExternalLink,
  Home,
  Inbox,
  LayoutDashboard,
  LogOut,
  MessageCircle,
  PanelsTopLeft,
  RefreshCw,
  Save,
  Settings2,
} from 'lucide-react';
import {
  adminLogout,
  buildWhatsAppUrl,
  fetchAdminMessages,
  fetchAdminSettings,
  getAdminToken,
  saveAdminSettings,
  type ContactMessageRow,
  type PublicSettings,
} from '@/lib/api';
import { Button } from '@/components/Button/Button';
import { ToggleSwitch } from '@/components/admin/ToggleSwitch';
import { useSiteSettings } from '@/hooks/useSiteSettings';
import { defaultHomeContent, normalizeHomeContent } from '@/lib/homeContent';
import { pageControlsMeta, type PageControlKey } from '@/lib/pageControls';
import { cn } from '@/utils/cn';

type Tab = 'home' | 'controls' | 'pages' | 'messages';

export function AdminDashboardPage() {
  const navigate = useNavigate();
  const { setSettingsLocal, refresh } = useSiteSettings();
  const [authorized, setAuthorized] = useState<boolean | null>(null);
  const [settings, setSettings] = useState<PublicSettings | null>(null);
  const [messages, setMessages] = useState<ContactMessageRow[]>([]);
  const [status, setStatus] = useState('');
  const [statusOk, setStatusOk] = useState(true);
  const [saving, setSaving] = useState(false);
  const [tab, setTab] = useState<Tab>('home');
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const loadData = async () => {
    const [s, m] = await Promise.all([fetchAdminSettings(), fetchAdminMessages()]);
    setSettings({
      ...s,
      home_content: normalizeHomeContent(s.home_content),
    });
    setMessages(m);
    if (m.length > 0) setSelectedId((prev) => prev ?? m[0].id);
    setAuthorized(true);
  };

  useEffect(() => {
    if (!getAdminToken()) {
      setAuthorized(false);
      return;
    }
    void loadData().catch(() => setAuthorized(false));
  }, []);

  const selectedMessage = useMemo(
    () => messages.find((m) => m.id === selectedId) ?? null,
    [messages, selectedId],
  );

  if (authorized === false) return <Navigate to="/admin/login" replace />;
  if (authorized === null || !settings) {
    return (
      <div className="relative flex min-h-screen items-center justify-center bg-surface text-ink-muted">
        <div className="absolute inset-0 grid-noise opacity-40" aria-hidden />
        <div className="relative flex items-center gap-3 rounded-2xl border border-border bg-surface-elevated/70 px-5 py-4 backdrop-blur">
          <RefreshCw className="h-4 w-4 animate-spin text-accent" aria-hidden />
          Loading admin dashboard…
        </div>
      </div>
    );
  }

  const previewUrl = buildWhatsAppUrl(settings.whatsapp_number, settings.whatsapp_message);

  const onSave = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setStatus('');
    try {
      const saved = await saveAdminSettings(settings);
      setSettings(saved);
      setSettingsLocal(saved);
      await refresh();
      setStatusOk(true);
      setStatus('Settings zimehifadhiwa. Home / frontend imesasishwa.');
    } catch (err) {
      setStatusOk(false);
      setStatus(err instanceof Error ? err.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const onLogout = async () => {
    await adminLogout();
    navigate('/admin/login', { replace: true });
  };

  const onRefreshMessages = async () => {
    try {
      const m = await fetchAdminMessages();
      setMessages(m);
      setStatusOk(true);
      setStatus('Messages zime-refresh.');
    } catch (err) {
      setStatusOk(false);
      setStatus(err instanceof Error ? err.message : 'Refresh failed');
    }
  };

  return (
    <div className="min-h-screen bg-surface text-ink">
      <div className="pointer-events-none fixed inset-0 grid-noise opacity-30" aria-hidden />

      <header className="sticky top-0 z-30 border-b border-border bg-surface/80 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3.5 sm:px-6">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-border bg-accent-soft text-accent">
              <LayoutDashboard className="h-5 w-5" aria-hidden />
            </span>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">
                Admin Front Control
              </p>
              <h1 className="text-display text-lg font-semibold sm:text-xl">Control Panel</h1>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-3.5 py-2 text-xs font-medium text-ink-muted transition hover:border-accent/30 hover:text-accent"
            >
              <ExternalLink className="h-3.5 w-3.5" aria-hidden />
              View site
            </Link>
            <Button type="button" variant="secondary" size="sm" onClick={() => void onLogout()}>
              <LogOut className="h-3.5 w-3.5" aria-hidden />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="mb-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
          <StatCard
            label="Help rail"
            value={settings.help_rail_enabled ? 'ON' : 'OFF'}
            tone={settings.help_rail_enabled ? 'accent' : 'muted'}
          />
          <StatCard
            label="WhatsApp button"
            value={settings.whatsapp_float_enabled ? 'ON' : 'OFF'}
            tone={settings.whatsapp_float_enabled ? 'green' : 'muted'}
          />
          <StatCard
            label="Demo promo"
            value={settings.demo_promo_enabled ? 'ON' : 'OFF'}
            tone={settings.demo_promo_enabled ? 'accent' : 'muted'}
          />
          <StatCard
            label="Pages ON"
            value={`${pageControlsMeta.filter((p) => settings[p.key]).length}/${pageControlsMeta.length}`}
            tone="accent"
          />
          <StatCard label="Inbox messages" value={String(messages.length)} tone="accent" />
        </div>

        <div className="mb-6 flex flex-wrap gap-2 rounded-2xl border border-border bg-surface-elevated/40 p-1.5">
          <TabButton
            active={tab === 'home'}
            onClick={() => setTab('home')}
            icon={Home}
            label="Home content"
          />
          <TabButton
            active={tab === 'controls'}
            onClick={() => setTab('controls')}
            icon={Settings2}
            label="Controls"
          />
          <TabButton
            active={tab === 'pages'}
            onClick={() => setTab('pages')}
            icon={PanelsTopLeft}
            label="Pages / Buttons"
          />
          <TabButton
            active={tab === 'messages'}
            onClick={() => setTab('messages')}
            icon={Inbox}
            label={`Messages (${messages.length})`}
          />
        </div>

        {status ? (
          <p
            className={cn(
              'mb-5 flex items-center gap-2 rounded-2xl border px-4 py-3 text-sm',
              statusOk
                ? 'border-emerald-500/25 bg-emerald-500/10 text-emerald-200'
                : 'border-amber-500/30 bg-amber-500/10 text-amber-200',
            )}
            role="status"
          >
            {statusOk ? <CheckCircle2 className="h-4 w-4 shrink-0" /> : null}
            {status}
          </p>
        ) : null}

        {tab === 'home' ? (
          <form
            onSubmit={onSave}
            className="rounded-[1.75rem] border border-border bg-surface-elevated/55 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.2)] sm:p-8"
          >
            <div className="flex items-start gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent-soft text-accent">
                <Home className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <h2 className="text-display text-2xl font-semibold">Edit Home page</h2>
                <p className="mt-1 text-sm text-ink-muted">
                  Badilisha kila maandishi yanayoonekana kwenye Home / Hero ya frontend.
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-5 lg:grid-cols-2">
              <Field
                id="home-eyebrow"
                label="Eyebrow (juu ya headline)"
                value={settings.home_content.eyebrow}
                onChange={(value) =>
                  setSettings((s) =>
                    s
                      ? {
                          ...s,
                          home_content: { ...s.home_content, eyebrow: value },
                        }
                      : s,
                  )
                }
              />
              <Field
                id="home-explore"
                label="Explore label (chini)"
                value={settings.home_content.exploreLabel}
                onChange={(value) =>
                  setSettings((s) =>
                    s
                      ? {
                          ...s,
                          home_content: { ...s.home_content, exploreLabel: value },
                        }
                      : s,
                  )
                }
              />
            </div>

            <label className="mt-5 block text-sm font-medium text-ink" htmlFor="home-headline">
              Headline (kichwa kikubwa)
            </label>
            <textarea
              id="home-headline"
              className="field-input mt-2 min-h-[88px]"
              value={settings.home_content.headline}
              onChange={(e) =>
                setSettings((s) =>
                  s
                    ? {
                        ...s,
                        home_content: { ...s.home_content, headline: e.target.value },
                      }
                    : s,
                )
              }
            />

            <label className="mt-5 block text-sm font-medium text-ink" htmlFor="home-subtitle">
              Subtitle / description
            </label>
            <textarea
              id="home-subtitle"
              className="field-input mt-2 min-h-[130px]"
              value={settings.home_content.subtitle}
              onChange={(e) =>
                setSettings((s) =>
                  s
                    ? {
                        ...s,
                        home_content: { ...s.home_content, subtitle: e.target.value },
                      }
                    : s,
                )
              }
            />

            <div className="mt-5 grid gap-5 lg:grid-cols-2">
              <Field
                id="home-cta-primary"
                label="Primary button (View My Work)"
                value={settings.home_content.ctaPrimary}
                onChange={(value) =>
                  setSettings((s) =>
                    s
                      ? {
                          ...s,
                          home_content: { ...s.home_content, ctaPrimary: value },
                        }
                      : s,
                  )
                }
              />
              <Field
                id="home-cta-secondary"
                label="Secondary button (Contact)"
                value={settings.home_content.ctaSecondary}
                onChange={(value) =>
                  setSettings((s) =>
                    s
                      ? {
                          ...s,
                          home_content: { ...s.home_content, ctaSecondary: value },
                        }
                      : s,
                  )
                }
              />
            </div>

            <Field
              id="home-image-alt"
              label="Hero image alt text"
              className="mt-5"
              value={settings.home_content.imageAlt}
              onChange={(value) =>
                setSettings((s) =>
                  s
                    ? {
                        ...s,
                        home_content: { ...s.home_content, imageAlt: value },
                      }
                    : s,
                )
              }
            />

            <Field
              id="home-portrait-url"
              label="Portrait photo URL (acha tupu = picha ya local)"
              className="mt-5"
              value={settings.home_content.portraitUrl}
              onChange={(value) =>
                setSettings((s) =>
                  s
                    ? {
                        ...s,
                        home_content: { ...s.home_content, portraitUrl: value },
                      }
                    : s,
                )
              }
            />
            <div className="mt-3 flex items-center gap-3 rounded-2xl border border-border bg-surface/40 p-3">
              <img
                src={
                  settings.home_content.portraitUrl.trim() ||
                  `${import.meta.env.BASE_URL}feruzi.jpg`
                }
                alt="Portrait preview"
                className="h-20 w-14 rounded-xl object-cover object-top"
              />
              <p className="text-xs text-ink-muted">
                Preview ya picha ya Home. Acha URL tupu ili kutumia picha uliyopakia.
              </p>
            </div>

            <label className="mt-5 block text-sm font-medium text-ink" htmlFor="home-trust">
              Trust tags (moja kwa line)
            </label>
            <p className="mt-1 text-xs text-ink-faint">
              Kila line = tag moja chini ya buttons (mfano: WhatsApp AI Chatbot)
            </p>
            <textarea
              id="home-trust"
              className="field-input mt-2 min-h-[140px] font-mono text-sm"
              value={settings.home_content.trustIndicators.join('\n')}
              onChange={(e) =>
                setSettings((s) =>
                  s
                    ? {
                        ...s,
                        home_content: {
                          ...s.home_content,
                          trustIndicators: e.target.value
                            .split(/\r?\n/)
                            .map((line) => line.trim())
                            .filter(Boolean),
                        },
                      }
                    : s,
                )
              }
            />

            <div className="mt-7 flex flex-wrap gap-3">
              <Button type="submit" disabled={saving}>
                <Save className="h-4 w-4" aria-hidden />
                {saving ? 'Saving…' : 'Save Home content'}
              </Button>
              <Button
                type="button"
                variant="secondary"
                disabled={saving}
                onClick={() =>
                  setSettings((s) =>
                    s
                      ? {
                          ...s,
                          home_content: { ...defaultHomeContent },
                        }
                      : s,
                  )
                }
              >
                Reset to default
              </Button>
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2.5 text-sm font-medium text-ink-muted transition hover:border-accent/30 hover:text-accent"
              >
                <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                Preview Home
              </Link>
            </div>
          </form>
        ) : tab === 'controls' ? (
          <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
            <form
              onSubmit={onSave}
              className="rounded-[1.75rem] border border-border bg-surface-elevated/55 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.2)] sm:p-8"
            >
              <div className="flex items-start gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#25D366]/15 text-[#25D366]">
                  <MessageCircle className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <h2 className="text-display text-2xl font-semibold">WhatsApp & Chatbot</h2>
                  <p className="mt-1 text-sm text-ink-muted">
                    Controls za floating button na CTA — zinaonekana moja kwa moja kwenye site.
                  </p>
                </div>
              </div>

              <div className="mt-8 space-y-3">
                <ToggleSwitch
                  id="help-rail"
                  label="Show Help / Msaada rail"
                  description="Buttons za Msaada, WhatsApp na AI Chatbot (kama primosoftware)"
                  checked={settings.help_rail_enabled}
                  onChange={(checked) =>
                    setSettings((s) => (s ? { ...s, help_rail_enabled: checked } : s))
                  }
                />
                <ToggleSwitch
                  id="wa-float"
                  label="Show WhatsApp on help rail"
                  description="Button ya WhatsApp kwenye floating rail"
                  checked={settings.whatsapp_float_enabled}
                  onChange={(checked) =>
                    setSettings((s) => (s ? { ...s, whatsapp_float_enabled: checked } : s))
                  }
                />
                <ToggleSwitch
                  id="demo-promo"
                  label="Show PrimoSoftware demo promo"
                  description="Anza demo bure · Jaribio la siku 7 — POS, stock, risiti za SMS"
                  checked={settings.demo_promo_enabled}
                  onChange={(checked) =>
                    setSettings((s) => (s ? { ...s, demo_promo_enabled: checked } : s))
                  }
                />
                <ToggleSwitch
                  id="chatbot-cta"
                  label="Show Chatbot CTA (Process page)"
                  description="CTA block kwenye page ya Process / How it works"
                  checked={settings.chatbot_cta_enabled}
                  onChange={(checked) =>
                    setSettings((s) => (s ? { ...s, chatbot_cta_enabled: checked } : s))
                  }
                />
              </div>

              <label className="mt-7 block text-sm font-medium text-ink" htmlFor="demo-url">
                Demo URL (PrimoSoftware)
              </label>
              <input
                id="demo-url"
                className="field-input mt-2"
                value={settings.demo_url}
                onChange={(e) =>
                  setSettings((s) => (s ? { ...s, demo_url: e.target.value } : s))
                }
                placeholder="https://primosoft.co.tz/register"
              />

              <label className="mt-5 block text-sm font-medium text-ink" htmlFor="wa-number">
                WhatsApp number
              </label>
              <p className="mt-1 text-xs text-ink-faint">
                Tumia format ya international, mfano <span className="font-mono">255768481766</span>
              </p>
              <input
                id="wa-number"
                className="field-input mt-2 font-mono"
                value={settings.whatsapp_number}
                onChange={(e) =>
                  setSettings((s) => (s ? { ...s, whatsapp_number: e.target.value } : s))
                }
              />

              <label className="mt-5 block text-sm font-medium text-ink" htmlFor="wa-message">
                Prefill message
              </label>
              <textarea
                id="wa-message"
                className="field-input mt-2 min-h-[120px]"
                value={settings.whatsapp_message}
                onChange={(e) =>
                  setSettings((s) => (s ? { ...s, whatsapp_message: e.target.value } : s))
                }
              />

              <div className="mt-7 flex flex-wrap gap-3">
                <Button type="submit" disabled={saving}>
                  <Save className="h-4 w-4" aria-hidden />
                  {saving ? 'Saving…' : 'Save controls'}
                </Button>
                <a
                  href={previewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1ebe57]"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden />
                  Preview WhatsApp
                </a>
              </div>
            </form>

            <aside className="rounded-[1.75rem] border border-border bg-gradient-to-b from-surface-elevated to-surface-muted p-6 sm:p-8">
              <h3 className="text-display text-lg font-semibold">Live preview</h3>
              <p className="mt-2 text-sm text-ink-muted">
                Hivi ndivyo button itakavyoonekana kwenye website.
              </p>

              <div className="relative mt-8 min-h-[220px] overflow-hidden rounded-[1.5rem] border border-border bg-surface p-5">
                <div className="absolute inset-0 grid-noise opacity-40" aria-hidden />
                <div className="relative space-y-3">
                  <div className="h-3 w-1/3 rounded-full bg-border" />
                  <div className="h-3 w-2/3 rounded-full bg-border/70" />
                  <div className="h-3 w-1/2 rounded-full bg-border/50" />
                </div>

                {settings.whatsapp_float_enabled ? (
                  <div className="absolute bottom-5 left-5 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-[0_12px_40px_rgba(37,211,102,0.35)]">
                    <MessageCircle className="h-5 w-5" aria-hidden />
                    WhatsApp AI
                  </div>
                ) : (
                  <p className="absolute bottom-5 left-5 text-xs text-ink-faint">
                    WhatsApp imezimwa kwenye rail.
                  </p>
                )}
                {settings.demo_promo_enabled ? (
                  <div className="absolute right-4 bottom-4 max-w-[10rem] rounded-xl border border-border bg-surface-elevated p-2 text-[10px]">
                    <p className="font-semibold text-accent">PrimoSoftware</p>
                    <p className="text-ink">Anza demo bure</p>
                  </div>
                ) : null}
              </div>

              <div className="mt-6 rounded-2xl border border-border bg-surface/50 p-4 text-xs leading-relaxed text-ink-muted">
                <p className="font-semibold text-ink">Current number</p>
                <p className="mt-1 font-mono text-accent">{settings.whatsapp_number || '—'}</p>
                <p className="mt-3 font-semibold text-ink">Message</p>
                <p className="mt-1">{settings.whatsapp_message || '—'}</p>
              </div>
            </aside>
          </div>
        ) : tab === 'pages' ? (
          <form
            onSubmit={onSave}
            className="rounded-[1.75rem] border border-border bg-surface-elevated/55 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.2)] sm:p-8"
          >
            <div className="flex items-start gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent-soft text-accent">
                <PanelsTopLeft className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <h2 className="text-display text-2xl font-semibold">Frontend pages & buttons</h2>
                <p className="mt-1 text-sm text-ink-muted">
                  Washa / zima button za navbar (Home, About, Skills, Services, Process, Projects,
                  Experience, Contact). Page iliyozimwa haionekani kwenye menu wala haifunguki.
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-3 md:grid-cols-2">
              {pageControlsMeta.map((page) => (
                <ToggleSwitch
                  key={page.key}
                  id={page.key}
                  label={page.label}
                  description={`${page.description} · ${page.path === '/' ? 'path: /' : `path: ${page.path}`}`}
                  checked={settings[page.key]}
                  onChange={(checked) =>
                    setSettings((s) =>
                      s ? { ...s, [page.key as PageControlKey]: checked } : s,
                    )
                  }
                />
              ))}
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <Button type="submit" disabled={saving}>
                <Save className="h-4 w-4" aria-hidden />
                {saving ? 'Saving…' : 'Save page buttons'}
              </Button>
              <Button
                type="button"
                variant="secondary"
                disabled={saving}
                onClick={() =>
                  setSettings((s) => {
                    if (!s) return s;
                    const next = { ...s };
                    for (const page of pageControlsMeta) next[page.key] = true;
                    return next;
                  })
                }
              >
                Enable all
              </Button>
              <Button
                type="button"
                variant="ghost"
                disabled={saving}
                onClick={() =>
                  setSettings((s) => {
                    if (!s) return s;
                    const next = { ...s };
                    for (const page of pageControlsMeta) {
                      // Keep at least Home so site always has a landing page
                      next[page.key] = page.key === 'page_home_enabled';
                    }
                    return next;
                  })
                }
              >
                Home only
              </Button>
            </div>
          </form>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded-[1.75rem] border border-border bg-surface-elevated/55 p-4 sm:p-5">
              <div className="mb-4 flex items-center justify-between gap-3 px-1">
                <h2 className="text-display text-xl font-semibold">Inbox</h2>
                <Button type="button" variant="ghost" size="sm" onClick={() => void onRefreshMessages()}>
                  <RefreshCw className="h-3.5 w-3.5" aria-hidden />
                  Refresh
                </Button>
              </div>

              <div className="max-h-[36rem] space-y-2 overflow-y-auto pr-1">
                {messages.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-border px-4 py-10 text-center text-sm text-ink-faint">
                    Hakuna message bado.
                  </div>
                ) : (
                  messages.map((msg) => (
                    <button
                      key={msg.id}
                      type="button"
                      onClick={() => setSelectedId(msg.id)}
                      className={cn(
                        'w-full rounded-2xl border px-4 py-3.5 text-left transition',
                        selectedId === msg.id
                          ? 'border-accent/40 bg-accent-soft'
                          : 'border-border bg-surface/40 hover:border-accent/25',
                      )}
                    >
                      <div className="flex items-baseline justify-between gap-2">
                        <p className="truncate text-sm font-semibold text-ink">{msg.subject}</p>
                        <span className="shrink-0 text-[10px] text-ink-faint">{msg.created_at}</span>
                      </div>
                      <p className="mt-1 truncate text-xs text-ink-muted">
                        {msg.name} · {msg.email}
                      </p>
                    </button>
                  ))
                )}
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-border bg-surface-elevated/55 p-6 sm:p-8">
              {selectedMessage ? (
                <>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
                    Message detail
                  </p>
                  <h3 className="text-display mt-2 text-2xl font-semibold text-ink">
                    {selectedMessage.subject}
                  </h3>
                  <div className="mt-4 flex flex-wrap gap-2 text-xs">
                    <span className="rounded-full border border-border px-3 py-1 text-ink-muted">
                      {selectedMessage.name}
                    </span>
                    <a
                      href={`mailto:${selectedMessage.email}`}
                      className="rounded-full border border-border px-3 py-1 text-accent hover:border-accent/40"
                    >
                      {selectedMessage.email}
                    </a>
                    <span className="rounded-full border border-border px-3 py-1 text-ink-faint">
                      {selectedMessage.created_at}
                    </span>
                  </div>
                  <p className="mt-6 whitespace-pre-wrap text-sm leading-relaxed text-ink-muted">
                    {selectedMessage.message}
                  </p>
                </>
              ) : (
                <p className="text-sm text-ink-faint">Chagua message kuona details.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  className,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-ink" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        className="field-input mt-2"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function StatCard({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: 'green' | 'accent' | 'muted';
}) {
  const valueClass =
    tone === 'green'
      ? 'text-[#25D366]'
      : tone === 'accent'
        ? 'text-accent'
        : 'text-ink-faint';

  return (
    <div className="rounded-2xl border border-border bg-surface-elevated/50 px-4 py-4">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-faint">{label}</p>
      <p className={cn('text-display mt-2 text-2xl font-semibold', valueClass)}>{value}</p>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  icon: Icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: typeof Settings2;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'inline-flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition sm:flex-none',
        active
          ? 'bg-accent text-surface shadow-sm'
          : 'text-ink-muted hover:bg-surface hover:text-ink',
      )}
    >
      <Icon className="h-4 w-4" aria-hidden />
      {label}
    </button>
  );
}
