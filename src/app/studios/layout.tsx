import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Creative Studios & Generative Labs | Mahi UI',
  description: 'Interactive generative design studios including Typography Studio, Icon Explorer, Color & Contrast, Theme Customizer, and Motion Physics.'
};

export default function StudiosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
