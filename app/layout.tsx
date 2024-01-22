import './globals.css';

import { Analytics } from 'components/analytics';
import { LoadingSpinner } from 'components/common/loading-spinner';
import { QueryContext } from 'components/common/query-context';
import { GeistSans } from 'geist/font/sans';
import Script from 'next/script';
import { Suspense } from 'react';

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Traffic Hub',
  description: '전국에 있는 모든 교통량을 보여드릴게요.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={GeistSans.className}>
      <body className="bg-background text-foreground">
        <Script
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_MAP_API_KEY}&libraries=services,clusterer&autoload=false`}
          strategy="beforeInteractive"
          defer
        />
        <Suspense fallback={<LoadingSpinner />}>
          <Analytics />
          <QueryContext>
            <main className="flex min-h-screen flex-col items-center">
              {children}
            </main>
          </QueryContext>
        </Suspense>
      </body>
    </html>
  );
}
