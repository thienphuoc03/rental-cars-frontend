'use client';

import { PlusCircle } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { columns } from '@/components/admin/users/columns';
import { UsersTable } from '@/components/admin/users/users-table';
import TableSkeleton from '@/components/skeletons/table-skeleton';
import { GET_ALL_USERS } from '@/lib/api-constants';
import { API } from '@/services';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getUsers = async () => {
    setIsLoading(true);
    try {
      const { data } = await API.get(GET_ALL_USERS);

      if (!data.data) return;

      setUsers(data.data);
      setIsLoading(false);
    } catch (error: any) {
      toast.error(error.message);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      {/* navbar */}
      <div className="mb-6 flex items-center justify-between gap-3">
        <h2 className="text-2xl font-bold">Quản lý người dùng</h2>

        <Link
          href="/admin/users/add"
          className="flex items-center justify-between gap-2 rounded border border-gray-100 bg-primary px-4 py-1 text-white hover:bg-primary/90 active:scale-95"
        >
          <PlusCircle className="h-4 w-4" />
          Thêm
        </Link>
      </div>

      {/* table */}
      <div>
        {users ? (
          <UsersTable columns={columns} data={users} />
        ) : (
          <TableSkeleton />
        )}
      </div>
    </div>
  );
}
