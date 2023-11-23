import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

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
  {
    title: 'Đăng ký chủ xe',
    href: '/owner-registration',
  },
];

const Navbar = () => {
  const pathName = usePathname();

  return (
    <ul className="flex items-center justify-center gap-6 md:hidden">
      {menuItems.map(({ title, href }, index) => (
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
