'use client';

import { addDays, format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import React from 'react';
import { DateRange } from 'react-day-picker';

import { Button } from '../ui/button';
import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

import { cn } from '@/lib/utils';

const SearchBox = () => {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(Date.now()),
    to: addDays(new Date(Date.now()), 1),
  });

  const submit = () => {
    // format date to ISO string
    const startDate = date?.from?.toISOString();
    const endDate = date?.to?.toISOString();

    console.log({ startDate, endDate });
  };
  return (
    <div className="absolute -mt-6 flex w-full items-center justify-center ">
      <div className="flex gap-2 rounded-lg bg-white p-6 shadow-lg">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={'outline'}
              className={cn(
                'flex items-center justify-center border-none text-left font-normal hover:bg-transparent focus:ring-transparent focus:ring-offset-0 active:scale-100',
                !date && 'text-muted-foreground',
              )}
            >
              <span className="text-2xl font-normal text-black">
                <span className="flex items-center justify-start text-base font-normal text-gray-500">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  Bắt đầu
                </span>
                {date?.from ? (
                  format(date.from, 'dd/MM/yyyy')
                ) : (
                  <span>chọn ngày</span>
                )}
              </span>

              <hr className="mx-10 my-4 h-3/5 w-[1px] bg-gray-200" />

              <span className="text-2xl font-normal text-black">
                <span className="flex items-center justify-start text-base font-normal text-gray-500">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  kết thúc
                </span>
                {date?.to ? (
                  format(date.to, 'dd/MM/yyyy')
                ) : (
                  <span>chọn ngày</span>
                )}
              </span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              max={30}
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>

        <Button
          onClick={submit}
          className="text-lg"
          size="lg"
          disabled={!date?.from || !date?.to}
        >
          Tìm xe
        </Button>
      </div>
    </div>
  );
};

export default SearchBox;
