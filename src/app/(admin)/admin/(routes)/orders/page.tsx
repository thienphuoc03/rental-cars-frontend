'use client';

import { PlusCircle } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { columns } from '@/components/admin/orders/columns';
import { orderStatus, paymentStatus } from '@/components/admin/orders/data';
import { DataTable } from '@/components/admin/tables/data-table';
import TableSkeleton from '@/components/skeletons/table-skeleton';
import { GET_ALL_ORDERS } from '@/lib/api-constants';
import { API } from '@/services';
import { useAppSelector } from '@/stores/hooks';
import { selectDep } from '@/stores/reducers/depReducer';

const filter = [{ orderStatus }, { paymentStatus }];
const initVisibleColumns = [
  'id',
  'deposits',
  'totalAmount',
  'orderStatus',
  'paymentStatus',
  'createdAt',
  'actions',
];

const OrderPage = () => {
  const dep = useAppSelector(selectDep);
  const [orders, setOrder] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getAllOrders = async () => {
    setIsLoading(true);
    try {
      const res = await API.get(GET_ALL_ORDERS);

      if (res.status === 200) {
        setOrder(res.data.data);

        res.data.data.map((order: any) => {
          if (order.orderDetailStatus === 'PENDING') {
            toast.warning(`Có ${res.data.data.length} đơn hàng đang chờ duyệt`);
          }
        });
      }

      setIsLoading(false);
    } catch (error: any) {
      toast.error(error.message);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllOrders();
  }, [dep]);

  return (
    <div>
      {/* navbar */}
      <div className="mb-6 flex items-center justify-between gap-3">
        <h2 className="text-2xl font-bold">Quản lý đơn hàng</h2>

        <Link
          href="/admin/orders/new"
          className="flex items-center justify-between gap-2 rounded border border-gray-100 bg-primary px-4 py-1 text-white hover:bg-primary/90 active:scale-95"
        >
          <PlusCircle className="h-4 w-4" />
          Thêm
        </Link>
      </div>

      {/* table */}
      <div>
        {orders.length > 0 ? (
          <DataTable
            columns={columns}
            data={orders}
            filters={filter}
            initVisibleColumns={initVisibleColumns}
          />
        ) : (
          <TableSkeleton />
        )}
      </div>
    </div>
  );
};

export default OrderPage;
