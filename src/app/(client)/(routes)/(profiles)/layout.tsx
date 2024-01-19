import { ReactNode } from 'react';

import Sidebar from '@/components/profile/Sidebar';

export default function ProfileLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-start justify-start">
      <Sidebar className="w-1/5" />
      <div className="w-4/5">{children}</div>
    </div>
  );
}
