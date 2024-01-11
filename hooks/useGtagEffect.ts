import * as gtag from 'lib/gtag';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export const useGtagEffect = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isProduction = process.env.NODE_ENV === 'production';

  useEffect(() => {
    if (isProduction && pathname) {
      gtag.pageview(pathname);
    }
  }, [pathname, searchParams]);

  return;
};
