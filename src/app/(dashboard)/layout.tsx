import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: {
    default: 'Rental Cars',
    template: '%s | Rental Cars',
  },
  description: 'Self-driving car rental application.',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="w-full px-6 flex justify-center">
        <section className="w-[1280px] max-w-[1280px]">{children}</section>
      </main>
    </>
  );
}
