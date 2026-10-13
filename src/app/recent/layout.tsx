import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Recently Opened Workspaces | Mahi UI',
  description: 'Revisit recently launched component sandboxes, generator studios, and developer tools.'
};

export default function RecentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
