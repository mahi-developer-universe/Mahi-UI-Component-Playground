import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Mahi UI — Modern Component Playground & 3D Lab',
  description: 'Production-oriented frontend developer platform featuring interactive UI components, design systems, Three.js 3D spatial geometry, and 450+ curated frontend resources.',
  keywords: ['UI components', 'design system', 'Three.js', 'Next.js', 'React', 'frontend playground']
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div className="app-container">
          <div className="ambient-glow glow-1"></div>
          <div className="ambient-glow glow-2"></div>
          {children}
        </div>
      </body>
    </html>
  );
}
