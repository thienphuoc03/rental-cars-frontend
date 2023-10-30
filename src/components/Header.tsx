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
    <header className="sticky top-0 left-0 w-full bg-primary min-h-max max-h-[80.438px] z-30">
      <div className="flex justify-center items-center py-4">
        <div className="flex justify-between items-center w-full px-32 lg:px-8">
          <Logo />

          <div className="flex justify-between items-center gap-3">
            <Navbar />

            <hr className="mx-2 border border-solid border-gray-300/50 h-6 md:hidden" />

            {/* login */}
            {isLogged ? (
              <>
                <Notification />

                <ProfileMenu />
              </>
            ) : (
              <div className="flex justify-center items-center gap-4 lg:hidden">
                <Link
                  href="/signup"
                  className="text-white p-2 rounded-md min-w-[110px] flex justify-center items-center hover:underline border border-solid border-gray-200 text-base font-medium"
                >
                  Đăng ký
                </Link>

                <Link
                  href="/signin"
                  className="text-black p-2 rounded-md min-w-[110px] flex justify-center items-center hover:underline border border-solid border-gray-200 text-base font-medium bg-white"
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
