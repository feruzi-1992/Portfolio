import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Bot,
  Eye,
  EyeOff,
  Lock,
  MessageCircle,
  ShieldCheck,
  User,
} from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { adminLogin } from '@/lib/api';
import { Button } from '@/components/Button/Button';

export function AdminLoginPage() {
  const navigate = useNavigate();
  const reduce = useReducedMotion();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await adminLogin(username.trim(), password);
      navigate('/admin', { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-surface px-4 py-8 sm:py-12">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 grid-noise opacity-40" />
        <div className="absolute top-[-10%] left-[-5%] h-[28rem] w-[28rem] rounded-full bg-accent/20 blur-[100px]" />
        <div className="absolute right-[-8%] bottom-[-10%] h-[26rem] w-[26rem] rounded-full bg-[#25D366]/18 blur-[110px]" />
      </div>

      <motion.div
        className="relative w-full max-w-5xl overflow-hidden rounded-[1.75rem] border border-border bg-surface-elevated/70 shadow-[0_40px_120px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:rounded-[2rem]"
        initial={reduce ? false : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="grid lg:grid-cols-[1.08fr_0.92fr]">
          <aside className="relative hidden overflow-hidden border-r border-border lg:block">
            <div className="absolute inset-0 bg-gradient-to-br from-[#0b1220] via-surface-elevated to-[#07140f]" />
            <div className="absolute inset-0 grid-noise opacity-30" />
            <div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-accent via-[#25D366] to-transparent" />

            <div className="relative flex h-full min-h-[560px] flex-col justify-between p-10 xl:p-12">
              <div>
                <div className="inline-flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-accent shadow-[0_0_30px_rgba(125,211,252,0.2)]">
                    <ShieldCheck className="h-6 w-6" aria-hidden />
                  </span>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent">
                      Secure admin
                    </p>
                    <p className="text-sm text-ink-muted">Portfolio Front Control</p>
                  </div>
                </div>

                <h1 className="text-display mt-10 max-w-md text-[2.6rem] font-bold leading-[1.05] text-ink">
                  Control your WhatsApp AI presence.
                </h1>
                <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-ink-muted">
                  Washa button, badilisha namba, na soma contact messages — kutoka dashboard moja.
                </p>
              </div>

              <div className="space-y-3">
                <FeatureRow
                  icon={MessageCircle}
                  title="WhatsApp floating button"
                  text="Washa / zima button ya kijani kwenye site"
                  color="text-[#25D366] bg-[#25D366]/15"
                />
                <FeatureRow
                  icon={Bot}
                  title="Chatbot CTA"
                  text="Dhibiti CTA ya Process / How it works"
                  color="text-accent bg-accent-soft"
                />
                <FeatureRow
                  icon={User}
                  title="Contact inbox"
                  text="Soma messages kutoka database"
                  color="text-violet-300 bg-violet-400/15"
                />
              </div>

              <p className="text-xs text-ink-faint">
                PrimoSoftware · Developer Feruzi · Admin access only
              </p>
            </div>
          </aside>

          <form onSubmit={onSubmit} className="relative p-6 sm:p-9 lg:p-10">
            <Link
              to="/"
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-transparent px-2 py-1 text-sm text-ink-muted transition hover:border-border hover:bg-surface hover:text-accent"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
              Back to website
            </Link>

            <div className="mb-8 lg:hidden">
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-accent-soft text-accent">
                <ShieldCheck className="h-5 w-5" aria-hidden />
              </div>
              <h1 className="text-display text-3xl font-bold text-ink">Front Control</h1>
            </div>

            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
              Admin login
            </p>
            <h2 className="text-display mt-2 text-3xl font-semibold text-ink">Sign in</h2>
            <p className="mt-2 text-sm text-ink-muted">
              Ingia kudhibiti controls za portfolio yako.
            </p>

            <div className="mt-8 space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-ink" htmlFor="username">
                  Username
                </label>
                <div className="relative">
                  <User className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-ink-faint" />
                  <input
                    id="username"
                    className="field-input h-12 pl-10"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    autoComplete="username"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-ink" htmlFor="password">
                  Password
                </label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-ink-faint" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    className="field-input h-12 pr-11 pl-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    required
                  />
                  <button
                    type="button"
                    className="absolute top-1/2 right-3 -translate-y-1/2 rounded-lg p-1.5 text-ink-faint transition hover:bg-surface hover:text-ink"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </div>

            {error ? (
              <p
                className="mt-4 rounded-2xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-100"
                role="alert"
              >
                {error}
              </p>
            ) : null}

            <Button type="submit" className="mt-7 h-12 w-full text-[15px]" disabled={loading}>
              {loading ? 'Signing in…' : 'Sign in to dashboard'}
            </Button>

            <div className="mt-6 rounded-2xl border border-border bg-surface/50 px-4 py-3 text-xs text-ink-faint">
              Protected area — tumia credentials za admin tu.
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

function FeatureRow({
  icon: Icon,
  title,
  text,
  color,
}: {
  icon: typeof MessageCircle;
  title: string;
  text: string;
  color: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3.5 backdrop-blur">
      <span className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${color}`}>
        <Icon className="h-4 w-4" aria-hidden />
      </span>
      <div>
        <p className="text-sm font-semibold text-ink">{title}</p>
        <p className="mt-0.5 text-xs text-ink-muted">{text}</p>
      </div>
    </div>
  );
}
