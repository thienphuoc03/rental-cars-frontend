'use client';

import Link from 'next/link';
import React from 'react';

import Logo from './Logo';
import MobileMenu from './MobileMenu';
import Navbar from './Navbar';
import Notification from './Notification';
import ProfileMenu from './ProfileMenu';

const Header = () => {
  const isLogged = false;

  return (
    <header className="sticky left-0 top-0 z-30 max-h-[80.438px] min-h-max w-full bg-primary">
      <div className="flex items-center justify-center py-4">
        <div className="flex w-full items-center justify-between px-32 lg:px-8">
          <Logo />

          <div className="flex items-center justify-between gap-3">
            <Navbar />

            <hr className="mx-2 h-6 border border-solid border-gray-300/50 md:hidden" />

            {/* login */}
            {isLogged ? (
              <>
                <Notification />

                <ProfileMenu />
              </>
            ) : (
              <div className="flex items-center justify-center gap-4 lg:hidden">
                <Link
                  href="/signup"
                  className="flex min-w-[110px] items-center justify-center rounded-md border border-solid border-gray-200 p-2 text-base font-medium text-white hover:underline"
                >
                  Đăng ký
                </Link>

                <Link
                  href="/signin"
                  className="flex min-w-[110px] items-center justify-center rounded-md border border-solid border-gray-200 bg-white p-2 text-base font-medium text-black hover:underline"
                >
                  Đăng nhập
                </Link>
              </div>
            )}

            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
