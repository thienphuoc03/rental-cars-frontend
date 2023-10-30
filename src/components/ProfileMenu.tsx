'use client';

import { LogOut, User } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import Username from './Username';

const profileMenuItems: { icon: any; title: string; href: string }[] = [
  {
    icon: <User size={18} />,
    title: 'Trang cá nhân',
    href: '/profile',
  },
  {
    icon: <User size={18} />,
    title: 'Trang cá nhân',
    href: '/profile',
  },
  {
    icon: <User size={18} />,
    title: 'Trang cá nhân',
    href: '/profile',
  },
];

const ProfileMenu = () => {
  return (
    <div className="block lg:hidden">
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="p-0 pr-2 rounded-full hover:bg-white/20 focus:bg-transparent focus:ring-0 focus:border-none focus:ring-offset-0"
          >
            <Username />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Tài khoản</DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            {profileMenuItems.map(({ icon, title, href }, index) => (
              <Link href={href} key={index}>
                <DropdownMenuItem className="cursor-pointer">
                  {icon}
                  <span className="ml-2">{title}</span>
                </DropdownMenuItem>
              </Link>
            ))}
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <Link href="/logout">
            <DropdownMenuItem className="cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ProfileMenu;
