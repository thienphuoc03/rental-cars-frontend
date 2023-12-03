import React from 'react';

import Header from '@/components/admin/header';
import { Sidebar } from '@/components/admin/sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen w-screen overflow-auto bg-white dark:bg-black dark:text-white">
      <div className="flex items-start justify-between">
        <Sidebar className="h-screen w-1/5 border-r-2 border-slate-50" />
        <div className="w-full">
          <Header />
          <main className="w-full bg-white p-4 dark:bg-black">{children}</main>
        </div>
      </div>
    </div>
  );
}
