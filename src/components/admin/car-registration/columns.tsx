'use client';

import { ColumnDef } from '@tanstack/react-table';

import {
  fuel,
  status,
  transmissions,
} from '@/components/admin/cars/common/data';
import { DeleteCarDialog } from '@/components/admin/cars/delete-car-dialog';
import StatusCombobox from '@/components/admin/cars/status-combobox';
import { CarType } from '@/components/admin/schemas';
import { DataTableColumnHeader } from '@/components/admin/tables/data-table-column-header';
import { DataTableRowActions } from '@/components/admin/tables/data-table-row-action';
import { Checkbox } from '@/components/ui/checkbox';
import { cn, formatDateToDMY, formatNumberToCurrency } from '@/lib/utils';
import ConfirmCarRegistrationAlertDialog from './confirm-car-registration-alert-dialog';

export const columns: ColumnDef<CarType>[] = [
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
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => <div className="">{row.getValue('id')}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tên xe" />
    ),
    cell: ({ row }) => <div className="">{row.getValue('name')}</div>,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'licensePlates',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Biển số" />
    ),
    cell: ({ row }) => <div className="">{row.getValue('licensePlates')}</div>,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'seats',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Số ghế" />
    ),
    cell: ({ row }) => <div className="">{row.getValue('seats')}</div>,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'transmission',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Hộp số" />
    ),
    cell: ({ row }) => {
      const trans = transmissions.find(
        (trans) => trans.key === row.getValue('transmission'),
      );

      if (!trans) {
        return null;
      }

      return (
        <div className="flex items-center">
          <span>{trans.value}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'fuel',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nhiên liệu" />
    ),
    cell: ({ row }) => {
      const fuelItem = fuel.find((fuel) => fuel.key === row.getValue('fuel'));

      if (!fuelItem) {
        return null;
      }

      return (
        <div className="flex items-center">
          <span>{fuelItem.value}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'pricePerDay',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Giá/ngày" />
    ),
    cell: ({ row }) => (
      <div className="">
        {formatNumberToCurrency(row.getValue('pricePerDay'))}
      </div>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'brand',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Hãng" />
    ),
    cell: ({ row }) => <div className="">{row.getValue('brand')}</div>,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'model',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Mẫu" />
    ),
    cell: ({ row }) => <div className="">{row.getValue('model')}</div>,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ngày tạo" />
    ),
    cell: ({ row }) => (
      <div className="">{formatDateToDMY(row.getValue('createdAt'))}</div>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Trạng thái" />
    ),
    cell: ({ row }) => {
      const statusItem = status.find(
        (statusItem) => statusItem.key === row.getValue('status'),
      );

      if (!statusItem) {
        return null;
      }

      return (
        <div
          className={cn(
            'flex justify-center rounded-full px-2 py-1 text-white',
            statusItem.key === 'AVAILABLE'
              ? 'bg-success/60'
              : statusItem.key === 'UNAVAILABLE'
              ? 'bg-error/60'
              : statusItem.key === 'RENTING'
              ? 'bg-warning/60'
              : 'bg-warning/60',
          )}
        >
          {statusItem.value
            ? status.find((sts: any) => sts.key === statusItem.key)?.value
            : ''}
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <div className="flex justify-center gap-2">
        <ConfirmCarRegistrationAlertDialog
          row={row}
          title="Xác nhận"
          status="AVAILABLE"
        />
        <ConfirmCarRegistrationAlertDialog
          row={row}
          title="Từ chối"
          className="bg-red-500 hover:bg-red-600"
          status="UNAVAILABLE"
        />
      </div>
    ),
  },
];
