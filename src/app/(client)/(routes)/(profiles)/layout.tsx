import { ReactNode } from 'react';

import Sidebar from '@/components/profile/Sidebar';

export default function ProfileLayout({ children }: { children: ReactNode }) {
  return (
    <div className="my-20 flex items-start justify-start">
      <Sidebar />
      <div className="w-2/3">{children}</div>
    </div>
  );
}
