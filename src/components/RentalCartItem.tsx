import { ImageIcon, X } from 'lucide-react';
import Image from 'next/image';
import { useDispatch } from 'react-redux';

import { formatCurrency } from '@/lib/utils';
import { removeItem } from '@/stores/reducers/cartReducer';

interface RentalCartItemProps {
  carId: number;
  carName: string;
  startDate: string;
  priceOfDay: number;
  endDate: string;
  totalAmount: number;
  images: string[];
}

const RentalCartItem = ({ car }: { car: RentalCartItemProps }) => {
  const dispatch = useDispatch();
  const handleRemoveItem = (carId: number) => {
    dispatch(removeItem(carId));
  };

  return (
    <div className="space-y-3 py-2">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="relative aspect-square h-16 w-16 min-w-fit overflow-hidden rounded">
            {car?.images ? (
              <Image
                src={car?.images[0]}
                alt={car?.carName}
                fill
                className="absolute object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-secondary">
                <ImageIcon
                  aria-hidden="true"
                  className="h-4 w-4 text-muted-foreground"
                />
              </div>
            )}
          </div>

          <div className="flex flex-col self-start">
            <span className="mb-1 line-clamp-1 text-sm font-medium">
              {car?.carName}
            </span>

            <span className="line-clamp-1 text-xs capitalize text-muted-foreground">
              {car?.startDate} - {car?.endDate}
            </span>

            <div className="mt-4 text-xs text-muted-foreground">
              <button
                onClick={() => handleRemoveItem(car?.carId)}
                className="flex items-center gap-0.5 hover:text-error"
              >
                <X className="h-4 w-3" />
                Xóa
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-1 font-medium">
          <span className="ml-auto line-clamp-1 text-sm">
            {formatCurrency(car?.totalAmount)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default RentalCartItem;
