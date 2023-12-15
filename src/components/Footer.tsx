import { Facebook, Instagram } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { Button } from './ui/button';
import TooltipCustom from './ui/tooltip-custom';

const policyItems = [
  {
    title: 'Chính sách và quy định',
    link: '/',
  },
  {
    title: 'Quy chế hoạt động',
    link: '/',
  },
  {
    title: 'Bảo mật thông tin',
    link: '/',
  },
  {
    title: 'Giải quyết tranh chấp',
    link: '/',
  },
];

const findOutMoreItems = [
  {
    title: 'Hướng dẫn chung',
    link: '/',
  },
  {
    title: 'Hướng dẫn đặt xe',
    link: '/',
  },
  {
    title: 'Hướng dẫn thanh toán',
    link: '/',
  },
  {
    title: 'Hỏi và trả lời',
    link: '/',
  },
];

const Footer = () => {
  return (
    <footer className="flex w-full justify-center border-t-2 border-solid border-gray-300 bg-[#f6f7f9] px-32 dark:bg-black/90 lg:px-8">
      <div className="flex w-full items-center justify-between py-6">
        {/* Logo */}
        <div className="flex flex-col items-center justify-between gap-2">
          <TooltipCustom content="Rental Cars">
            <Image
              src={'/images/logo2.png'}
              width={250}
              height={0}
              alt="logo"
              className="cursor-pointer"
            />
          </TooltipCustom>

          <div className="flex flex-col items-start justify-between gap-5">
            <div className="">
              <p className="text-base text-gray-800">0987654321</p>
              <p className="text-base text-gray-600">
                Tổng đài hỗ trợ: 7AM - 10AM
              </p>
            </div>

            <div className="">
              <p className="text-base text-gray-800">contact@rentalcars.vn</p>
              <p className="text-base text-gray-600">Gửi mail cho chúng thôi</p>
            </div>

            <div className="flex items-center justify-between gap-6">
              <TooltipCustom content="Facebook">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full bg-transparent hover:scale-110 hover:text-blue-800"
                >
                  <Facebook size={18} />
                </Button>
              </TooltipCustom>

              <TooltipCustom content="Instagram">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full bg-transparent hover:scale-110 hover:text-red-600"
                >
                  <Instagram size={18} />
                </Button>
              </TooltipCustom>

              <TooltipCustom content="Twitter">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full bg-transparent hover:scale-110 hover:text-black"
                >
                  <Image
                    src={'/icons/twitter-icon.svg'}
                    alt=""
                    width={20}
                    height={0}
                  />
                </Button>
              </TooltipCustom>
            </div>
          </div>
        </div>

        {/* Chinh sach */}
        <div className="flex flex-col items-start justify-between gap-5">
          <h3 className="text-base font-semibold">Chính sách</h3>

          {policyItems.map(({ title, link }, key) => (
            <Link href={link} key={key} className="hover:underline">
              <p className="text-sm text-gray-600">{title}</p>
            </Link>
          ))}
        </div>

        {/* Tim hieu them */}
        <div className="flex flex-col items-start justify-between gap-5">
          <h3 className="text-base font-semibold">Tìm hiểu thêm</h3>

          {findOutMoreItems.map(({ title, link }, key) => (
            <Link href={link} key={key} className="hover:underline">
              <p className="text-sm text-gray-600">{title}</p>
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
