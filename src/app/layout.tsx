
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import React from 'react';
import { Toaster } from 'sonner';

import { ThemeProvider } from '@/components/theme-provider';
import Providers from '@/stores/Providers';
import './globals.css';

const roboto = Roboto({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
  weight: ['100', '300', '400', '500', '700', '900'],
});

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: {
    default: 'Rental Cars',
    template: '%s | Rental Cars',
  },
  description: 'Self-driving car rental application.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${roboto.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>{children}</Providers>
          <Toaster
            position="bottom-right"
            richColors={true}
            closeButton={true}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
