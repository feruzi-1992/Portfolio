interface SkillCardProps {
  name: string;
}

export function SkillCard({ name }: SkillCardProps) {
  return (
    <div className="rounded-lg border border-border bg-surface-elevated px-3.5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-accent/35 hover:bg-accent-soft">
      {name}
    </div>
  );
}
