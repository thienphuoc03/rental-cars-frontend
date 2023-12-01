import React from 'react';

import Header from '@/components/admin/Header';
import { Sidebar } from '@/components/admin/sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen w-screen">
      <div className="flex items-start justify-between">
        <Sidebar className="h-screen w-1/5 border-r-2 border-slate-50" />
        <div className="mr-4 w-full">
          <Header />
          <main className="w-full p-4">{children}</main>
        </div>
      </div>
    </div>
  );
}
