import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://mahi-developer-universe.github.io/Mahi-UI-Component-Playground'),
  title: {
    default: 'Mahi UI — Modern Component Playground & 3D Lab',
    template: '%s | Mahi UI'
  },
  description: 'Production-oriented frontend developer platform featuring 30 interactive UI workspaces, W3C DTCG design tokens, Three.js 3D spatial geometry, and 450+ curated frontend resources.',
  keywords: ['UI components', 'design system', 'Three.js', 'Next.js', 'React 19', 'frontend playground', 'DTCG tokens'],
  authors: [{ name: 'Mahi Developer Universe', url: 'https://github.com/mahi-developer-universe' }],
  openGraph: {
    title: 'Mahi UI — Modern Component Playground & 3D Lab',
    description: '30 interactive frontend workspaces, design tokens, and developer utilities in one cohesive platform.',
    url: 'https://mahi-developer-universe.github.io/Mahi-UI-Component-Playground/',
    siteName: 'Mahi UI Component Playground',
    images: [
      {
        url: '/favicon.svg',
        width: 1200,
        height: 630,
        alt: 'Mahi UI Component Playground'
      }
    ],
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mahi UI — Modern Component Playground & 3D Lab',
    description: '30 interactive frontend workspaces, design tokens, and developer utilities in one cohesive platform.',
    images: ['/favicon.svg']
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' }
    ],
    shortcut: '/favicon.svg',
    apple: '/favicon.svg'
  }
};

import type { Viewport } from 'next';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#10b981'
};

import { AppShell } from '@/components/layout/AppShell';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#10b981" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                  navigator.serviceWorker.register('/sw.js').catch(() => {});
                });
              }
            `
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <div className="app-container">
          <div className="ambient-glow glow-1"></div>
          <div className="ambient-glow glow-2"></div>
          <AppShell>
            {children}
          </AppShell>
        </div>
      </body>
    </html>
  );
}
