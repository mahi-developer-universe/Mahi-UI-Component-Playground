import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Settings & Workspace Preferences | Mahi UI',
  description: 'Manage design system themes, reduced motion animations, export format preferences, and viewport preview defaults.'
};

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
