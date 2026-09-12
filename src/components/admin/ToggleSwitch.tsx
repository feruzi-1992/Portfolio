import { cn } from '@/utils/cn';

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  id: string;
  label: string;
  description?: string;
}

export function ToggleSwitch({ checked, onChange, id, label, description }: ToggleSwitchProps) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-border bg-surface/40 px-4 py-4 transition hover:border-accent/25">
      <div className="min-w-0">
        <p className="text-sm font-semibold text-ink" id={`${id}-label`}>
          {label}
        </p>
        {description ? <p className="mt-0.5 text-xs text-ink-faint">{description}</p> : null}
      </div>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        aria-labelledby={`${id}-label`}
        onClick={() => onChange(!checked)}
        className={cn(
          'relative h-7 w-12 shrink-0 rounded-full transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
          checked ? 'bg-[#25D366]' : 'bg-border',
        )}
      >
        <span
          className={cn(
            'absolute top-0.5 left-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform duration-300',
            checked ? 'translate-x-5' : 'translate-x-0',
          )}
        />
      </button>
    </div>
  );
}
