'use client';

import { Table } from '@tanstack/react-table';
import { X } from 'lucide-react';

import { UsersTableFacetedFilter } from '@/components/admin/users/users-table-faceted-filter';
import { UsersTableViewOptions } from '@/components/admin/users/users-table-view-options';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { roles, statuses } from './common/data';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function UsersTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Tên người dùng..."
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('name')?.setFilterValue(event.target.value)
          }
          className="h-8 w-[250px] lg:w-[150px]"
        />
        {table.getColumn('status') && (
          <UsersTableFacetedFilter
            column={table.getColumn('status')}
            title="Trạng thái"
            options={statuses}
          />
        )}
        {table.getColumn('role') && (
          <UsersTableFacetedFilter
            column={table.getColumn('role')}
            title="Vai trò"
            options={roles}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-3 lg:px-2"
          >
            Đặt lại
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <div>
        <UsersTableViewOptions table={table} />
      </div>
    </div>
  );
}
