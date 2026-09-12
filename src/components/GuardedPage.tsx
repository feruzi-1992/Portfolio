import { Navigate } from 'react-router-dom';
import { useSiteSettings } from '@/hooks/useSiteSettings';
import { firstEnabledPath, isPageEnabled } from '@/lib/pageControls';

/** Blocks a public page when Admin has turned that frontend button/page OFF */
export function GuardedPage({
  path,
  children,
}: {
  path: string;
  children: React.ReactNode;
}) {
  const { settings, loading } = useSiteSettings();

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center text-sm text-ink-muted">
        Loading…
      </div>
    );
  }

  if (!isPageEnabled(path, settings)) {
    return <Navigate to={firstEnabledPath(settings)} replace />;
  }

  return <>{children}</>;
}
