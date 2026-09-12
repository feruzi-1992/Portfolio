export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

export function hasUrl(value: string | undefined | null): boolean {
  if (!value) return false;
  const trimmed = value.trim();
  return (
    trimmed.length > 0 &&
    trimmed !== 'YOUR_GITHUB_URL' &&
    trimmed !== 'YOUR_EMAIL_HERE' &&
    !trimmed.startsWith('YOUR_')
  );
}

export function scrollToId(id: string): void {
  const el = document.getElementById(id.replace('#', ''));
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
