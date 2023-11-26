import { MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface CarCardProps {
  slug: string;
  image: string;
  name: string;
  transmission: string;
  address: string;
  price: number;
  trip: number;
  rating: number;
}

const CarCard = ({
  slug,
  image,
  name,
  transmission,
  address,
  price,
  trip,
  rating,
}: CarCardProps) => {
  return (
    <Link
      href={`car/${slug}`}
      className="flex min-w-[180px] flex-col items-stretch justify-center gap-6 rounded-lg border border-gray-100 bg-white p-4 shadow-xl hover:scale-105"
    >
      <div className="overflow-hidden rounded-lg">
        <Image src={image} alt="car" width={272} height={204} />
      </div>

      <div className="text-start">
        {/* feature car */}
        <div className="mb-2 flex items-center justify-start">
          <span className="rounded-full bg-primary/10 px-2 py-1 text-xs text-[#262626]">
            {transmission}
          </span>
        </div>

        <h3 className="text-base font-bold capitalize">{name}</h3>
        <span className="text-xs text-gray-500">
          <MapPin size={16} className="inline text-black" /> {address}
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
              {trip} chuyến đi
            </span>
          </div>
          <span className="text-base font-semibold text-primary">
            {price}K
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
