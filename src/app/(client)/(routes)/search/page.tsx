'use client';

import { CalendarDays, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { toast } from 'sonner';

import CarCard from '@/components/CarCard';
import FilterDialog from '@/components/FilterDialog';
import SearchSkeleton from '@/components/skeletons/search-skeleton';
import { Button } from '@/components/ui/button';
import { SEARCH_CARS } from '@/lib/api-constants';
import { formatDateToISO } from '@/lib/utils';
import { API } from '@/services';

const SearchPage = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [carList, setCarList] = useState<any>();
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(0);

  const getCarList = async () => {
    setIsLoading(true);
    try {
      const startDate = formatDateToISO(searchParams.startDate);
      const endDate = formatDateToISO(searchParams.endDate);

      const response = await API.get(
        SEARCH_CARS + `?startDate=${startDate}&endDate=${endDate}&page=${page}`,
      );

      console.log(
        SEARCH_CARS + `?startDate=${startDate}&endDate=${endDate}&page=${page}`,
      );

      if (!response) {
        toast.error('Có lỗi xảy ra, vui lòng thử lại sau');
        setIsLoading(false);
        return;
      }

      setPage(response.data.meta._page);
      setTotalPage(response.data.meta.totalPages);
      setCarList(response.data);
      setIsLoading(false);
    } catch (error: any) {
      toast.error(error.message);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
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
          <span>
            <CalendarDays size={24} className="mr-4 inline-block" />
            {searchParams.startDate}
            {' - '}
            {searchParams.endDate}
          </span>
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
