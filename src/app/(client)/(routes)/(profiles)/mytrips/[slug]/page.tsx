'use client';

import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { columns } from '@/app/(client)/(routes)/(profiles)/myorders/columns';
import {
  orderStatus,
  paymentStatus,
} from '@/app/(client)/(routes)/(profiles)/mytrips/data';
import { DataTable } from '@/components/admin/tables/data-table';
import { Button } from '@/components/ui/button';
import { GET_ORDER_BY_USER_ID } from '@/lib/api-constants';
import { formatCurrency, formatDateToDMY } from '@/lib/utils';
import { API } from '@/services';

const initVisibleColumns = [
  'id',
  'orderId',
  'carId',
  'startDate',
  'endDate',
  'totalAmount',
  'orderDetailStatus',
  'paymentStatus',
];

const OrderPage = () => {
  const [order, setOrder] = useState<any>();
  const pathname = usePathname();

  const getOrderById = async () => {
    try {
      const res = await API.get(
        GET_ORDER_BY_USER_ID + `/${pathname.split('/')[2]}`,
      );

      if (res.status === 200) {
        setOrder(res.data);
      }

      return;
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getOrderById();
  }, []);

  return (
    <div className="w-full rounded-xl bg-white p-6">
      <div className="mb-10">
        <header className="flex items-center justify-between">
          <h3 className="text-2xl font-bold">Thông tin đơn hàng</h3>

          <Button>Tạo hợp đồng</Button>
        </header>
      </div>

      <div className="w-full">
        <div className="flex w-full flex-col items-start justify-between gap-3">
          <div className="flex items-center justify-center gap-3">
            <h4 className="text-base font-semibold">Mã đơn hàng:</h4>
            <span>{order?.id}</span>
          </div>
          <div className="flex items-center justify-center gap-3">
            <h4 className="text-base font-semibold">Người thuê:</h4>
            <span>{order?.traveler}</span>
          </div>
          <div className="flex items-center justify-center gap-3">
            <h4 className="text-base font-semibold">Tổng tiền:</h4>
            <span>{formatCurrency(order?.totalAmount)}</span>
          </div>
          <div className="flex items-center justify-center gap-3">
            <h4 className="text-base font-semibold">Tiền cọc:</h4>
            <span>{formatCurrency(order?.deposits)}</span>
          </div>
          <div className="flex items-center justify-center gap-3">
            <h4 className="text-base font-semibold">Trạng thái đơn hàng:</h4>
            <span>
              {orderStatus.map((item: any) => {
                if (item.key === order?.orderStatus) {
                  return item.value;
                }
              })}
            </span>
          </div>
          <div className="flex items-center justify-center gap-3">
            <h4 className="text-base font-semibold">Trạng thái thanh toán:</h4>
            <span>
              {' '}
              {paymentStatus.map((item: any) => {
                if (item.key === order?.paymentStatus) {
                  return item.value;
                }
              })}
            </span>
          </div>
          <div className="flex items-center justify-center gap-3">
            <h4 className="text-base font-semibold">Ngày đặt:</h4>
            <span>{formatDateToDMY(order?.createdAt)}</span>
          </div>
        </div>

        <div className="mt-6">
          {order?.OrderDetail?.length && (
            <DataTable
              columns={columns}
              data={order?.OrderDetail}
              initVisibleColumns={initVisibleColumns}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
