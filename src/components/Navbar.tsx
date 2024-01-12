import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

const menuItems: { title: string; href: string }[] = [
  {
    title: 'Trang chủ',
    href: '/',
  },
  {
    title: 'Giới thiệu',
    href: '/about',
  },
];

const Navbar = () => {
  const [menu, setMenu] = useState<any[]>(menuItems);
  const pathName = usePathname();

  const generateMenu = () => {
    const userInfo: any = JSON.parse(localStorage.getItem('user') || '{}');
    if (userInfo) {
      if (userInfo.role && userInfo?.role === 'TRAVELER') {
        setMenu([
          ...menuItems,
          {
            title: 'Đăng ký chủ xe',
            href: '#explorer',
          },
        ]);
      }
    }
  };

  useEffect(() => {
    generateMenu();
  }, []);

  return (
    <ul className="flex items-center justify-center gap-6 md:hidden">
      {menu.map(({ title, href }, index) => (
        <li
          key={index}
          className={cn(
            `text-base font-medium text-white hover:underline`,
            pathName === href ? 'underline' : '',
          )}
        >
          <Link href={href}>{title}</Link>
        </li>
      ))}
    </ul>
  );
};

export default Navbar;
