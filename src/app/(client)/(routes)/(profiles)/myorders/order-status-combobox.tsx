'use client';

import { useEffect, useState } from 'react';

import UpdateOrderDetailStatusAlertDialog from '@/app/(client)/(routes)/(profiles)/myorders/update-order-detail-status-alert-dialog';
import { Button } from '@/components/ui/button';
import { Command, CommandGroup } from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

const OrderStatusCombobox = ({
  status,
  statusInit,
  orderDetailId,
  carId,
}: {
  status: any;
  statusInit: any;
  orderDetailId: number;
  carId: number;
}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<{
    key: string;
    value: string;
  }>(statusInit);

  useEffect(() => {
    setValue(value);
  }, []);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            'justify-between rounded-full px-2 py-1 text-white',
            value.key === 'PENDING'
              ? 'bg-warning/60'
              : value.key === 'CONFIRMED'
              ? 'bg-success/50'
              : value.key === 'CANCELED'
              ? 'bg-error/60'
              : value.key === 'COMPLETED'
              ? 'bg-success'
              : value.key === 'RECEIVED'
              ? 'bg-info/60'
              : 'bg-warning/60',
          )}
        >
          {value
            ? status.find((statusItem: any) => statusItem.key === value.key)
                ?.value
            : ''}
          {/* <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" /> */}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandGroup className="">
            {status.map((statusItem: any) => (
              <UpdateOrderDetailStatusAlertDialog
                statusItem={statusItem}
                statusInit={statusInit}
                orderDetailId={orderDetailId}
                carId={carId}
                key={statusItem.key}
              />
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default OrderStatusCombobox;
