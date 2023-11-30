import { Bell } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';

import { Button } from './ui/button';
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
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button
          variant="ghost"
          className="relative flex h-auto w-auto items-center justify-center rounded-full p-2 hover:bg-white/20 focus:border-none focus:bg-transparent focus:ring-0 focus:ring-offset-0"
        >
          <Bell size={20} className="text-white" />
          <div className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-96">
        <h2 className="text-md font-bold text-black">Thông báo</h2>

        <hr className="mb-4 mt-1 h-[1px] w-full bg-slate-50" />

        <div>
          <ScrollArea className="h-72 w-full">
            <div className="px-4">
              {notificationList.map(({ title, description, timer }, index) => (
                <Link href="/" key={index}>
                  <div className="flex cursor-pointer flex-col items-start justify-center">
                    <h2 className="text-base font-medium">{title}</h2>
                    <span className="text-sm text-black">{description}</span>
                    <span className="text-xs text-gray-400">{timer}</span>
                  </div>
                </Link>
              ))}
            </div>
          </ScrollArea>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default Notification;
