'use client';

import React, { useEffect, useState } from 'react';

import { columns } from '@/components/admin/users/columns';
import { UserNav } from '@/components/admin/users/user-nav';
import { UsersTable } from '@/components/admin/users/users-table';
import { GET_ALL_USERS } from '@/lib/api-constants';
import { API } from '@/services';

export default function UsersPage() {
  const [users, setUsers] = useState();
  const getUsers = async () => {
    const { data } = await API.get(GET_ALL_USERS);

    setUsers(data.data);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      {/* navbar */}
      <div className="mb-6 flex items-center justify-between gap-3">
        <h2 className="text-2xl font-bold">Quản lý người dùng</h2>
        <UserNav />
      </div>

      {/* table */}
      <div>{users && <UsersTable columns={columns} data={users} />}</div>
    </div>
  );
}
