'use client';

import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';

import { UserType } from '@/components/admin/schemas';
import { UsersTableColumnHeader } from '@/components/admin/users/users-table-column-header';
import { UsersTableRowActions } from '@/components/admin/users/users-table-row-action';
import { Checkbox } from '@/components/ui/checkbox';
import { cn, formatDateToDMY } from '@/lib/utils';

import { roles, statuses } from './common/data';

export const columns: ColumnDef<UserType>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <UsersTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => <div className="">{row.getValue('id')}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'avatarUrl',
    header: ({ column }) => (
      <UsersTableColumnHeader column={column} title="Avatar" />
    ),
    cell: ({ row }) => (
      <Image
        src={row.getValue('avatarUrl')}
        alt={row.getValue('avatarUrl')}
        width={40}
        height={40}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'username',
    header: ({ column }) => (
      <UsersTableColumnHeader column={column} title="Tài khoản" />
    ),
    cell: ({ row }) => <div className="">{row.getValue('username')}</div>,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <UsersTableColumnHeader column={column} title="Họ tên" />
    ),
    cell: ({ row }) => (
      <div className="">
        {row.getValue('name') ? (
          <>{row.getValue('name')}</>
        ) : (
          <>Khng có dữ liệu</>
        )}
      </div>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <UsersTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => (
      <div className="">
        {row.getValue('email') ? (
          <>{row.getValue('email')}</>
        ) : (
          <>Khng có dữ liệu</>
        )}
      </div>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'phone',
    header: ({ column }) => (
      <UsersTableColumnHeader column={column} title="Số điện thoại" />
    ),
    cell: ({ row }) => (
      <div className="">
        {row.getValue('phone') ? (
          <>{row.getValue('phone')}</>
        ) : (
          <>Không có dữ liệu</>
        )}
      </div>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <UsersTableColumnHeader column={column} title="Ngày tham gia" />
    ),
    cell: ({ row }) => (
      <div className="">{formatDateToDMY(row.getValue('createdAt'))}</div>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'role',
    header: ({ column }) => (
      <UsersTableColumnHeader column={column} title="Vai trò" />
    ),
    cell: ({ row }) => {
      const roleList = roles.find(
        (roleList) => roleList.key === row.getValue('role'),
      );

      if (!roleList) {
        return null;
      }

      return (
        <div className="flex items-center">
          <span>{roleList.value}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <UsersTableColumnHeader column={column} title="Trạng thái" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.key === row.getValue('status'),
      );

      if (!status) {
        return null;
      }

      return (
        <div className="flex w-[100px] items-center">
          <span
            className={cn(
              'rounded-full px-4 py-1 text-white',
              status.key === 'ACTIVE'
                ? 'bg-success/70'
                : status.key === 'INACTIVE'
                ? 'bg-error/70'
                : 'bg-warning/70',
            )}
          >
            {status.value}
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <UsersTableRowActions row={row} />,
  },
];
