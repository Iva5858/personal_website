'use client';

import { usePathname } from 'next/navigation';
import Navigation from './Navigation';
import Footer from './Footer';

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isDemoRoute = pathname?.includes('/demo');

  return (
    <>
      {!isDemoRoute && <Navigation />}
      <main className={isDemoRoute ? 'pt-0' : 'pt-16'}>
        {children}
      </main>
      {!isDemoRoute && <Footer />}
    </>
  );
}

