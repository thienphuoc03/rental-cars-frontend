import { MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { cn, formatDateToDMY, formatNumberToCurrency } from '@/lib/utils';
import { FuelEnum, TransmissionEnum } from '@/types/enums';

import TooltipCustom from './ui/tooltip-custom';

interface CarCardProps {
  slug: string;
  thumbnail: string;
  name: string;
  transmission: keyof typeof TransmissionEnum;
  fuel: keyof typeof FuelEnum;
  address: string;
  pricePerDay: number;
  trips: number;
  rating: number;
  status: string;
  orderDetails: any[];
}

const CarCard = ({
  slug,
  thumbnail,
  name,
  fuel,
  address,
  pricePerDay,
  trips,
  rating,
  status,
  orderDetails,
}: CarCardProps) => {
  return (
    <Link
      href={`car/${slug}`}
      className="flex min-h-[356px] min-w-[180px] flex-col items-stretch justify-center gap-6 overflow-hidden rounded-lg border border-gray-100 bg-white p-4 text-black shadow-xl hover:scale-105 xl:min-h-[398px] dark:bg-black dark:text-white"
    >
      <div className="overflow-hidden rounded-lg">
        <Image src={thumbnail} alt="car" width={272} height={204} />
      </div>

      <div className="text-start">
        {/* feature car */}
        <div className="mb-2 flex items-center justify-start gap-4">
          <span className="rounded-full bg-primary/10 px-2 py-1 text-xs text-[#262626] dark:bg-primary dark:text-white">
            {FuelEnum[fuel]}
          </span>

          {orderDetails.length > 0 && (
            <TooltipCustom
              content={orderDetails.map((orderDetail, index) => (
                <div
                  key={index}
                  className={cn(
                    'my-1 flex items-center justify-between rounded-full p-1',
                    orderDetail?.orderDetailStatus === 'RECEIVED'
                      ? 'bg-yellow-500/10'
                      : '',
                  )}
                >
                  <span className="text-xs text-gray-500">
                    {formatDateToDMY(orderDetail.startDate)} -{' '}
                    {formatDateToDMY(orderDetail.endDate)}
                  </span>
                </div>
              ))}
              className="z-[29]"
            >
              <span
                className={cn(
                  'rounded-full px-2 py-1 text-xs text-[#262626]  dark:text-white',
                  status === 'RENTING'
                    ? 'bg-yellow-500/10 dark:bg-yellow-500'
                    : 'bg-success/10 dark:bg-success',
                )}
              >
                {status === 'RENTING' ? 'Đang cho thuê' : 'Lịch đã đặt'}
              </span>
            </TooltipCustom>
          )}
        </div>

        <h3 className="text-base font-bold capitalize">{name}</h3>
        <span className="text-xs text-gray-500">
          <MapPin size={16} className="inline text-black dark:text-white" />{' '}
          {address}
        </span>

        <div className="my-4 h-[1px] w-full bg-gray-200" />

        <div className="flex items-center justify-between">
          <div className="flex items-center justify-center gap-3">
            <span className="flex items-center justify-center gap-1 text-xs text-gray-500">
              <Image
                src={'/icons/star-rating-icon.svg'}
                alt="star rating"
                width={13}
                height={13}
                className="inline"
              />
              {rating}
            </span>

            <span className="flex items-center justify-center gap-1 text-xs text-gray-500">
              <Image
                src={'/icons/suitcase-icon.svg'}
                alt="star rating"
                width={13}
                height={13}
                className="inline"
              />
              {trips} chuyến đi
            </span>
          </div>
          <span className="text-base font-semibold text-primary">
            {formatNumberToCurrency(pricePerDay)}
            <p className="ml-1 inline-block text-xs font-normal text-gray-500">
              / ngày
            </p>
          </span>
        </div>
      </div>
    </Link>
  );
};

export default CarCard;
