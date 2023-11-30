import { ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';

const RentalCart = () => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className="relative">
          <span className="block cursor-pointer rounded-full p-2 hover:bg-slate-50/30">
            <ShoppingCart className="h-5 w-5 text-white" />
          </span>
          <span className="absolute -right-[1px] -top-[1px] flex items-center justify-center rounded-full bg-red-500 text-[10px] font-semibold text-white">
            <p className="px-1">2</p>
          </span>
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-80 overflow-hidden">
        <h2 className="text-md font-bold text-black">Danh sách xe</h2>

        <hr className="mb-4 mt-1 h-[1px] w-full bg-slate-50" />

        <div className="flex flex-col items-stretch justify-between gap-2">
          <div className="flex items-center justify-between gap-4 text-xs">
            <div className="flex items-center justify-between gap-2">
              <Image
                src="/images/car-img-1.jpg"
                alt=""
                width={40}
                height={40}
                className="bg-slate-50"
              />

              <div className="flex w-44 flex-col items-start justify-between gap-1 text-xs">
                <span className="inline-block w-40 truncate font-bold">
                  Xe Toyota ABC 2025
                </span>
                <span className="truncates w-40 text-[10px] text-foreground">
                  14/12/2023 - 16/12/2023
                </span>
              </div>
            </div>

            <div>
              <span className="font-medium text-primary">3.500 K</span>
            </div>
          </div>
          <div className="flex items-center justify-between gap-4 text-xs">
            <div className="flex items-center justify-between gap-2">
              <Image
                src="/images/car-img-2.jpg"
                alt=""
                width={40}
                height={40}
                className="bg-slate-50"
              />

              <div className="flex w-44 flex-col items-start justify-between gap-1 text-xs">
                <span className="inline-block w-40 truncate font-bold">
                  Xe Toyota ABC 2025
                </span>
                <span className="w-40 truncate text-[10px] text-foreground">
                  14/12/2023 - 16/12/2023
                </span>
              </div>
            </div>

            <div>
              <span className="font-medium text-primary">3.500 K</span>
            </div>
          </div>
        </div>

        <hr className="my-4 h-[1px] w-full bg-slate-50" />

        <div className="w-full text-right">
          <Link
            href="/"
            className="font text-md rounded bg-primary px-4 py-2 text-white"
          >
            Xem chi tiết
          </Link>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default RentalCart;
