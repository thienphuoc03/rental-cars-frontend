'use client';

import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { columns } from '@/components/admin/cars/columns';
import { fuel, status } from '@/components/admin/cars/common/data';
import { DataTable } from '@/components/admin/tables/data-table';
import TableSkeleton from '@/components/skeletons/table-skeleton';
import { GET_ALL_MY_CAR } from '@/lib/api-constants';
import { API } from '@/services';
import { useAppSelector } from '@/stores/hooks';
import { selectDep } from '@/stores/reducers/depReducer';

const MycarsPage = () => {
  const [cars, setCars] = useState();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dep = useAppSelector(selectDep);

  const filterCars = [{ status }, { fuel }];

  const getCars = async () => {
    setIsLoading(true);
    try {
      const { data } = await API.get(GET_ALL_MY_CAR);

      if (!data) return;

      setCars(data);
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
    <div className="w-full rounded-xl bg-white p-6">
      <div className="mb-10">
        <header className="flex items-center justify-between">
          <h3 className="text-2xl font-bold">Danh sách xe</h3>
        </header>
      </div>

      <div>
        {cars ? (
          <DataTable
            columns={columns}
            data={cars}
            search="name"
            filters={filterCars}
            initVisibleColumns={[
              'id',
              'name',
              'licensePlates',
              'status',
              'fuel',
              'pricePerDay',
              'actions',
            ]}
            statuses={status}
          />
        ) : (
          <TableSkeleton />
        )}
      </div>
    </div>
  );
};

export default MycarsPage;
