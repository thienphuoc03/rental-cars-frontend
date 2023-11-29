'use client';

import { PopoverClose } from '@radix-ui/react-popover';
import { addDays, format } from 'date-fns';
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { toast } from 'sonner';

import CarCard from '@/components/CarCard';
import FilterDialog from '@/components/FilterDialog';
import SearchSkeleton from '@/components/skeletons/search-skeleton';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { SEARCH_CARS } from '@/lib/api-constants';
import { cn, formatDateToDMY, formatDateToISO } from '@/lib/utils';
import { API } from '@/services';

const SearchPage = ({ searchParams }: { searchParams: any }) => {
  const [carList, setCarList] = useState<any>();
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [date, setDate] = useState<any>({
    from: new Date(searchParams.startDate),
    to: new Date(searchParams.endDate),
  });

  const getCarList = async () => {
    try {
      const startDate = formatDateToISO(formatDateToDMY(date.from as Date));
      const endDate = formatDateToISO(formatDateToDMY(date.to as Date));

      const response = await API.get(
        SEARCH_CARS + `?startDate=${startDate}&endDate=${endDate}&page=${page}`,
      );

      if (!response) {
        toast.error('Có lỗi xảy ra, vui lòng thử lại sau');
        return;
      }

      setPage(response.data.meta._page);
      setTotalPage(response.data.meta.totalPages);
      setCarList(response.data);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handlePageClick = async (event: any) => {
    setPage(event.selected + 1);
    await getCarList();
  };

  useEffect(() => {
    getCarList();
  }, [page]);

  return (
    <div className="mt-6">
      <header className="sticky top-0 z-30 rounded-lg bg-white px-6 py-6 shadow-xl">
        <div className="text-center">
          <div className="my-4 flex w-full items-center justify-center">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant={'outline'}
                  className={cn(
                    'flex items-center justify-center border-none text-left font-normal hover:bg-transparent' +
                      ' border border-gray-300 focus:ring-transparent focus:ring-offset-0 active:scale-100',
                    !date && 'text-muted-foreground',
                  )}
                >
                  <span className="text-xl font-normal text-black">
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

                  <span className="text-xl font-normal text-black">
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
                <div>
                  <Calendar
                    initialFocus
                    mode="range"
                    max={30}
                    defaultMonth={date?.from}
                    selected={date}
                    onSelect={setDate}
                    numberOfMonths={2}
                    fromDate={addDays(new Date(Date.now()), 1)}
                  />
                </div>

                <div className="flex items-center justify-between gap-3 p-6">
                  <PopoverClose asChild>
                    <Button variant="outline" className="px-8">
                      Hủy
                    </Button>
                  </PopoverClose>

                  <PopoverClose asChild>
                    <Button onClick={getCarList}>Tìm xe</Button>
                  </PopoverClose>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="">
          <FilterDialog />
        </div>
      </header>

      <div className="mt-6 grid grid-cols-4 gap-6">
        {carList?.data ? (
          <>
            {carList.data.map((car: any, index: number) => (
              <div className="col-span-1" key={index}>
                <CarCard {...car} />
              </div>
            ))}
          </>
        ) : (
          <SearchSkeleton />
        )}
      </div>

      {/* pagination */}
      <div className="mt-10">
        <ReactPaginate
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={totalPage}
          previousLabel={
            <Button size="icon" variant="ghost" className="rounded-full">
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>
          }
          breakLabel="..."
          nextLabel={
            <Button size="icon" variant="ghost" className="rounded-full">
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
          }
          renderOnZeroPageCount={null}
          containerClassName="flex items-center justify-center gap-2"
          pageClassName="rounded-full w-10 h-10 flex items-center justify-center hover:bg-slate-200/60 cursor-pointer"
          activeClassName="bg-slate-200"
        />
      </div>
    </div>
  );
};

export default SearchPage;
