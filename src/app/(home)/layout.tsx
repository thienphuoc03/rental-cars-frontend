import type { Metadata } from 'next';
import React from 'react';

import Header from '@/components/Header';

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: {
    default: 'Rental Cars',
    template: '%s | Rental Cars',
  },
  description: 'Self-driving car rental application.',
};

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="flex h-[633px] w-screen justify-center">
        <section className="w-full px-32 lg:px-8">{children}</section>
      </main>
    </>
  );
}
