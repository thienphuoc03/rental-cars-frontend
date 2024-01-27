'use client';

import { PopoverClose } from '@radix-ui/react-popover';
import { addDays, format } from 'date-fns';
import {
  ArrowRight,
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
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
  const router = useRouter();
  const [carList, setCarList] = useState<any>();
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [date, setDate] = useState<any>({
    from: new Date(searchParams.startDate),
    to: new Date(searchParams.endDate),
  });
  const [filter, setFilter] = useState<any>();

  const getCarList = async () => {
    try {
      const startDate = formatDateToISO(formatDateToDMY(date.from as Date));
      const endDate = formatDateToISO(formatDateToDMY(date.to as Date));

      const response = await API.get(
        SEARCH_CARS + `?startDate=${startDate}&endDate=${endDate}&page=${page}`,
        filter,
      );

      if (!response) {
        toast.error('Có lỗi xảy ra, vui lòng thử lại sau');
        return;
      }

      router.replace(
        `/search?startDate=${startDate}&endDate=${endDate}&page=${page}`,
        {
          scroll: false,
        },
      );

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
    <div className="mt-2">
      <header className="rounded-lg bg-white py-6 dark:bg-black">
        <div className="text-center">
          <div className="my-2 flex w-full items-center justify-between">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant="outline"
                  className={cn(
                    'flex items-center justify-center border border-gray-300 text-left font-normal hover:bg-transparent focus:ring-transparent focus:ring-offset-0 active:scale-100 dark:text-white',
                    !date && 'text-muted-foreground',
                  )}
                >
                  <span className="text-base font-normal text-black dark:text-white">
                    {date?.from ? (
                      format(date.from, 'dd/MM/yyyy')
                    ) : (
                      <span>chọn ngày</span>
                    )}
                  </span>

                  <span>
                    <ArrowRight className="mx-3 size-4 text-gray-500" />
                  </span>

                  <span className="text-base font-normal text-black dark:text-white">
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

            <FilterDialog date={date} setCarList={setCarList} />
          </div>
        </div>

        <div className="">{/* <FilterDialog /> */}</div>
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
          pageClassName="rounded-full w-10 h-10 flex items-center justify-center hover:bg-slate-200/60 cursor-pointer dark:bg-slate-200"
          activeClassName="bg-slate-200 dark:bg-slate-800"
        />
      </div>
    </div>
  );
};

export default SearchPage;
