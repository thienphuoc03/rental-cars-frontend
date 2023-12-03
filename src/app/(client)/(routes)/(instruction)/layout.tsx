'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import { cn } from '@/lib/utils';

const sidebar: { title: string; href: string }[] = [
  {
    title: 'Hướng dẫn chung',
    href: '/howitwork',
  },
  {
    title: 'Hướng dẫn đặt xe',
    href: '/bookinghowto',
  },
  {
    title: 'Hướng dẫn thanh toán',
    href: '/paymenthowto',
  },
  {
    title: 'Quy chế hoạt động',
    href: '/regu',
  },
];

export default function InstructionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="my-8">
      {/* banner */}
      <div className="relative">
        <Image
          src={'/images/banner-instruction.png'}
          alt=""
          width={1280}
          height={450}
        />

        <div className="absolute bottom-1/2 top-1/2 flex h-full w-full text-center">
          <h2 className="w-full text-7xl font-semibold text-white">
            Hướng dẫn & Quy chế
          </h2>
        </div>
      </div>

      {/* content */}
      <div className="relative mt-16 flex items-start justify-between gap-10 rounded-lg bg-white p-10">
        {/* sidebar */}
        <div className="">
          <ul className="min-w-[250px]">
            {sidebar.map(({ title, href }, index) => (
              <li
                key={index}
                className={cn(
                  `cursor-pointer border-b-[1px] border-t-[1px] border-gray-200 px-1 py-3`,
                  href.startsWith(pathname) ? 'font-medium' : '',
                )}
              >
                <Link
                  href={href}
                  className={cn(
                    href.startsWith(pathname)
                      ? 'border-l-4 border-primary'
                      : '',
                    'px-2',
                  )}
                >
                  {title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* main */}
        <div className="h-full w-full">{children}</div>
      </div>
    </div>
  );
}
