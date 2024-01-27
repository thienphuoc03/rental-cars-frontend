'use client';

import { PlusCircle } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { columns } from '@/components/admin/cars/columns';
import { fuel, status } from '@/components/admin/cars/common/data';
import { DataTable } from '@/components/admin/tables/data-table';
import TableSkeleton from '@/components/skeletons/table-skeleton';
import { GET_ALL_CARS } from '@/lib/api-constants';
import { API } from '@/services';
import { useAppSelector } from '@/stores/hooks';
import { selectDep } from '@/stores/reducers/depReducer';
import { usePathname } from 'next/navigation';

const filterCars = [{ status }, { fuel }];

const initVisibleColumns = [
  'id',
  'name',
  'licensePlate',
  'seats',
  'fuel',
  'pricePerDay',
  'brand',
  'createdAt',
  'status',
  'actions',
];

export default function CarsPage() {
  const dep = useAppSelector(selectDep);
  const [cars, setCars] = useState();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const pathname = usePathname();

  const getCars = async () => {
    setIsLoading(true);
    try {
      const { data } = await API.get(GET_ALL_CARS);

      if (!data.data) return;

      setCars(data.data);
      setIsLoading(false);
    } catch (error: any) {
      toast.error(error.message);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCars();
  }, [dep]);

  return (
    <div>
      {/* navbar */}
      <div className="mb-6 flex items-center justify-between gap-3">
        <h2 className="text-2xl font-bold">Quản lý xe</h2>

        <Link
          href={`${pathname}/new`}
          className="flex items-center justify-between gap-2 rounded border border-gray-100 bg-primary px-4 py-1 text-white hover:bg-primary/90 active:scale-95"
        >
          <PlusCircle className="h-4 w-4" />
          Thêm
        </Link>
      </div>

      {/* table */}
      <div>
        {cars ? (
          <DataTable
            columns={columns}
            data={cars}
            search="name"
            filters={filterCars}
            initVisibleColumns={initVisibleColumns}
          />
        ) : (
          <TableSkeleton />
        )}
      </div>
    </div>
  );
}
