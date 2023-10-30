import { Bell } from 'lucide-react';
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
import { ScrollArea } from './ui/scroll-area';

const notificationList: {
  title: string;
  description: string;
  timer: string;
}[] = [
  {
    title: 'Thuê Hyundai Accent dài hạn với chi phí tiết kiệm 🚗',
    description: '🌟Ưu đãi 5-10% - chỉ từ 15 triệu/ tháng cùng Mioto ',
    timer: '3h trước',
  },
  {
    title: '🚙 Thuê xe 7 chỗ rộng rãi, gia đình di chuyển thoải mái',
    description: '⚡️Giảm 300k cho lần đầu thuê xe 7 chỗ tại Mioto',
    timer: '4h trước',
  },
  {
    title: 'Bạn ơi, Xe VINFAST FADIL 2019 đang đợi chốt!',
    description:
      'Kèo thì đã lên, deal cũng đã có. Mở MIOTO để nhận ưu đãi 200K khi nhập THUEGAP. Chốt xe ưng ý và thuê ngay thôi!',
    timer: '10h trước',
  },
  {
    title: '🚘 Đưa đi đón về, thảnh thơi di chuyển ',
    description:
      '🌟 Thuê xe có tài 2 chiều (gói 4h) vi vu nội thành giá chỉ từ 700k',
    timer: '1 ngày trước',
  },
  {
    title: 'Xe HONDA CIVIC 2022 đang có deal tốt!',
    description:
      'Nhập THUENGAY giảm ngay 200K. Giữ chỗ sớm chiếc xe yêu thích trên Mioto để không bỏ lỡ hành trình tuyệt vời của bạn!',
    timer: '2 ngày trước',
  },
];

const Notification = () => {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative flex justify-center items-center p-2 h-auto w-auto rounded-full hover:bg-white/20 focus:bg-transparent focus:ring-0 focus:border-none focus:ring-offset-0"
        >
          <Bell size={20} className="text-white" />
          <div className="absolute w-2 h-2 bg-red-500 rounded-full top-1 right-1" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-96">
        <DropdownMenuLabel>Thông báo</DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <ScrollArea className="h-72 w-full">
            <div className="px-4">
              {notificationList.map(({ title, description, timer }, index) => (
                <Link href="/" key={index}>
                  <DropdownMenuItem className="flex flex-col justify-center items-start cursor-pointer">
                    <h2 className="text-base font-medium">{title}</h2>
                    <span className="text-sm text-black">{description}</span>
                    <span className="text-xs text-gray-400">{timer}</span>
                  </DropdownMenuItem>
                </Link>
              ))}
            </div>
          </ScrollArea>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Notification;
