'use client';

import { ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import RentalCartItem from '@/components/RentalCartItem';
import { buttonVariants } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { formatCurrency } from '@/lib/utils';

const RentalCart = () => {
  const cars = useSelector((state: any) => state.cart.items);
  const itemCount = cars.length;

  const [isMounted, setIsMounted] = useState<boolean>(false);

  const cartTotal = () => {
    return cars.reduce(
      (total: any, car: { totalAmount: any }) => total + car?.totalAmount,
      0,
    );
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  console.log({ cartTotal });

  return (
    <Sheet>
      <SheetTrigger className="tex-white group -m-2 flex items-center rounded p-2">
        <ShoppingCart
          aria-hidden="true"
          className="h-6 w-6 flex-shrink-0 text-white group-hover:scale-105"
        />
        <span className="ml-1 text-sm font-medium text-white group-hover:scale-105">
          {isMounted ? itemCount : 0}
        </span>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
        <SheetHeader className="space-y-2.5 pr-6">
          <SheetTitle>Thuê xe ({itemCount})</SheetTitle>
        </SheetHeader>
        {itemCount > 0 ? (
          <>
            <div className="flex w-full flex-col pr-6">
              <ScrollArea className="h-[488px]">
                {cars.map((car: any, index: number) => (
                  <RentalCartItem car={car} key={index} />
                ))}
              </ScrollArea>
            </div>
            <div className="space-y-4 pr-6">
              <Separator />
              <div className="space-y-1.5 text-sm">
                <div className="flex items-center justify-between">
                  <span className="flex-1 font-bold">Tổng tiền</span>
                  <span className="text-xl font-bold text-primary">
                    {formatCurrency(cartTotal())}
                  </span>
                </div>
              </div>

              <SheetFooter>
                <SheetTrigger asChild>
                  <Link
                    href="/cart"
                    className={buttonVariants({
                      className: 'w-full rounded-full',
                    })}
                  >
                    Thanh toán
                  </Link>
                </SheetTrigger>
              </SheetFooter>
            </div>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center space-y-1">
            <div
              aria-hidden="true"
              className="relative mb-4 h-60 w-60 text-muted-foreground"
            >
              <Image
                src="/images/hippo-empty-cart.png"
                fill
                alt="empty shopping cart hippo"
              />
            </div>
            <div className="text-xl font-semibold">
              Chưa có xe nào được chọn
            </div>
            <SheetTrigger asChild>
              <Link
                href="/products"
                className={buttonVariants({
                  variant: 'link',
                  size: 'sm',
                  className: 'text-sm text-muted-foreground',
                })}
              >
                Thêm xe để thanh toán
              </Link>
            </SheetTrigger>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default RentalCart;
