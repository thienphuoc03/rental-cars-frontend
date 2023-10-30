import Link from 'next/link';
import React from 'react';

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
  return (
    <ul className="flex justify-center items-center gap-6 md:hidden">
      {menuItems.map(({ title, href }, index) => (
        <li
          key={index}
          className="text-base font-medium text-white hover:underline"
        >
          <Link href={href}>{title}</Link>
        </li>
      ))}
    </ul>
  );
};

export default Navbar;
