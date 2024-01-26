import './globals.css';

import { Analytics } from 'components/analytics';
import { LoadingSpinner } from 'components/common/loading-spinner';
import { QueryContext } from 'components/common/query-context';
import { GeistSans } from 'geist/font/sans';
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
        <Suspense fallback={<LoadingSpinner />}>
          <Analytics />
          <QueryContext>
            <main>{children}</main>
          </QueryContext>
        </Suspense>
      </body>
    </html>
  );
}
