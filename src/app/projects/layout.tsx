import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '30 Interactive Frontend Projects & Labs | Mahi UI',
  description: 'Explore, experiment, and customize 30 interactive frontend tools, generative design studios, UI component labs, and developer workflows.'
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
