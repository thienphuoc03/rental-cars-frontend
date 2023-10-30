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
    <div className="hidden relative lg:block">
      <Button variant="ghost" size="icon" className="" onClick={toggleMenu}>
        <Menu size={20} />
      </Button>

      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-[#f6f7f9]">
          <Button
            variant="outline"
            className="absolute right-4 top-4 rounded-full"
            size="icon"
            onClick={toggleMenu}
          >
            <X size={20} />
          </Button>

          <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/4 bg-white p-4 rounded-lg">
            <Link href="/">
              <Username className="text-black text-base font-medium" />
            </Link>

            <hr className="my-4 border border-solid border-gray-300/50 w-full" />

            <ul className="flex flex-col justify-center items-center">
              {mobileMenuItems.map(({ title, href }, index) => (
                <li
                  key={index}
                  className="w-full cursor-pointer rounded-lg hover:bg-gray-100 hover:underline"
                >
                  <Link
                    href={href}
                    className="text-base font-medium flex justify-center items-center px-32 py-4 whitespace-nowrap"
                  >
                    {title}
                  </Link>
                </li>
              ))}
            </ul>

            <hr className="my-4 border border-solid border-gray-300/50 w-full" />

            {/* check login */}
            {isLogged ? (
              <Button
                variant="ghost"
                className="w-full hover:underline text-base font-medium"
                onClick={() => setIsLogged(false)}
              >
                <LogOut size={18} className="rotate-180 mr-3" />
                Đăng xuất
              </Button>
            ) : (
              <div className="flex justify-center items-center gap-4">
                <Link
                  href="/signup"
                  className="p-2 rounded-md min-w-[110px] flex justify-center items-center hover:underline border border-solid border-gray-200 text-base font-medium"
                >
                  Đăng ký
                </Link>

                <Link
                  href="/signin"
                  className="p-2 rounded-md min-w-[110px] flex justify-center items-center hover:underline border border-solid border-gray-200 text-base font-medium bg-primary text-white"
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
