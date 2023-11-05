'use client';

import { LogOut, Menu, X } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import { Button } from './ui/button';
import Username from './Username';

const mobileMenuItems: { title: string; href: string }[] = [
  {
    title: 'Trang chủ',
    href: '/',
  },
  {
    title: 'Giới thiệu',
    href: '/about',
  },
  {
    title: 'Đăng ký chủ xe',
    href: '/owner-registration',
  },
];

const MobileMenu = () => {
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Function to close the mobile menu when the screen size is larger than 1024px
  const closeMenu = () => {
    if (window.innerWidth >= 1024 && isOpen) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    // Add an event listener to check for screen size changes
    window.addEventListener('resize', closeMenu);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', closeMenu);
    };
  }, [isOpen]);

  return (
    <div className="relative hidden lg:block">
      <Button variant="ghost" size="icon" className="" onClick={toggleMenu}>
        <Menu size={20} />
      </Button>

      {isOpen && (
        <div className="fixed left-0 top-0 h-full w-full bg-[#f6f7f9]">
          <Button
            variant="outline"
            className="absolute right-4 top-4 rounded-full"
            size="icon"
            onClick={toggleMenu}
          >
            <X size={20} />
          </Button>

          <div className="absolute left-1/2 top-1/4 -translate-x-1/2 -translate-y-1/4 transform rounded-lg bg-white p-4">
            <Link href="/">
              <Username className="text-base font-medium text-black" />
            </Link>

            <hr className="my-4 w-full border border-solid border-gray-300/50" />

            <ul className="flex flex-col items-center justify-center">
              {mobileMenuItems.map(({ title, href }, index) => (
                <li
                  key={index}
                  className="w-full cursor-pointer rounded-lg hover:bg-gray-100 hover:underline"
                >
                  <Link
                    href={href}
                    className="flex items-center justify-center whitespace-nowrap px-32 py-4 text-base font-medium"
                  >
                    {title}
                  </Link>
                </li>
              ))}
            </ul>

            <hr className="my-4 w-full border border-solid border-gray-300/50" />

            {/* check login */}
            {isLogged ? (
              <Button
                variant="ghost"
                className="w-full text-base font-medium hover:underline"
                onClick={() => setIsLogged(false)}
              >
                <LogOut size={18} className="mr-3 rotate-180" />
                Đăng xuất
              </Button>
            ) : (
              <div className="flex items-center justify-center gap-4">
                <Link
                  href="/signup"
                  className="flex min-w-[110px] items-center justify-center rounded-md border border-solid border-gray-200 p-2 text-base font-medium hover:underline"
                >
                  Đăng ký
                </Link>

                <Link
                  href="/signin"
                  className="flex min-w-[110px] items-center justify-center rounded-md border border-solid border-gray-200 bg-primary p-2 text-base font-medium text-white hover:underline"
                >
                  Đăng nhập
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;
