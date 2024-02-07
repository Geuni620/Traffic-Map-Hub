import './globals.css';

import { Analytics } from 'components/analytics';
import { LoadingSpinner } from 'components/common/loading-spinner';
import { QueryContext } from 'components/common/query-context';
import { GeistSans } from 'geist/font/sans';
import { Suspense } from 'react';
import CONFIG from 'site.config';
import { Toaster } from 'sonner';

export const metadata = {
  metadataBase: new URL(CONFIG.url),
  title: CONFIG.title,
  description: CONFIG.description,
  icons: {
    icon: {
      url: '/favicon.png',
      type: 'image/png',
      sizes: '32x32',
    },
  },

  openGraph: {
    title: CONFIG.title,
    description: CONFIG.description,
    url: CONFIG.url,
    siteName: CONFIG.title,
    locale: 'ko-KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: CONFIG.title,
    description: CONFIG.description,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={GeistSans.className}>
      <body className="bg-background text-foreground">
        <Suspense fallback={<LoadingSpinner />}>
          <Toaster duration={2000} position="bottom-center" richColors />
          <Analytics />
          <QueryContext>
            <main>{children}</main>
          </QueryContext>
        </Suspense>
      </body>
    </html>
  );
}
