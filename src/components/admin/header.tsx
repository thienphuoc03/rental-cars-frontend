'use client';

import React from 'react';

import { ModeToggle } from '@/components/mode-toggle';
import Username from '@/components/Username';

const Header = () => {
  return (
    <header className="sticky left-0 right-0 top-0 z-30 w-full bg-slate-50 p-4 text-black shadow dark:bg-black dark:text-white">
      <div></div>
      <div className="flex items-center justify-end gap-6">
        <Username className="text-black" />

        <ModeToggle />
      </div>
    </header>
  );
};

export default Header;
