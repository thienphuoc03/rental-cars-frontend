'use client';

import React, { useEffect, useState } from 'react';

import { DataTable } from '@/components/admin/tables/data-table';
import { API } from '@/services';
import { toast } from 'sonner';
import { GET_ALL_OWNER_REGISTRATION } from '@/lib/api-constants';
import TableSkeleton from '@/components/skeletons/table-skeleton';
import { columns } from '../../../../../components/admin/owner-registration/columns';

const initVisibleColumns = ['id', 'name', 'avatarUrl', 'registerAt', 'actions'];

const OwnerRegistrationPage = () => {
  const [registers, setRegisters] = useState();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getAllRegisters = async () => {
    setIsLoading(true);
    try {
      const { data } = await API.get(GET_ALL_OWNER_REGISTRATION);

      if (!data) return;

      setRegisters(data);
      setIsLoading(false);
    } catch (error: any) {
      toast.error(error.message);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllRegisters();
  }, []);

  return (
    <div>
      {/* navbar */}
      <div className="mb-6 flex items-center justify-between gap-3">
        <h2 className="text-2xl font-bold">Yêu cầu đăng ký chủ xe</h2>
      </div>

      {/* table */}
      <div>
        {registers ? (
          <DataTable
            columns={columns}
            data={registers}
            search="name"
            initVisibleColumns={initVisibleColumns}
          />
        ) : (
          <TableSkeleton />
        )}
      </div>
    </div>
  );
};

export default OwnerRegistrationPage;
