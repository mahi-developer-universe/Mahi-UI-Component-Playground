import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Favorites & Saved Bookmarks | Mahi UI',
  description: 'Quickly access your pinned frontend tools, design libraries, and bookmarked component sandboxes.'
};

export default function FavoritesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
