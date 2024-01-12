'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { columns } from '@/app/(client)/(routes)/(profiles)/myorders/columns';
import { paymentStatus } from '@/app/(client)/(routes)/(profiles)/mytrips/data';
import { DataTable } from '@/components/admin/tables/data-table';
import { Button } from '@/components/ui/button';
import { GET_ORDER_BY_USER_ID } from '@/lib/api-constants';
import { cn, formatCurrency, formatDateToDMY } from '@/lib/utils';
import { API } from '@/services';
import { OrderDetailStatusEnum } from '@/types/enums';

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
          {/* <div className="flex items-center justify-center gap-3"> */}
          {/*   <h4 className="text-base font-semibold">Trạng thái đơn hàng:</h4> */}
          {/*   <span> */}
          {/*     {orderStatus.map((item: any) => { */}
          {/*       if (item.key === order?.orderStatus) { */}
          {/*         return item.value; */}
          {/*       } */}
          {/*     })} */}
          {/*   </span> */}
          {/* </div> */}
          {/* <div className="flex items-center justify-center gap-3"> */}
          {/*   <h4 className="text-base font-semibold">Trạng thái thanh toán:</h4> */}
          {/*   <span> */}
          {/*     {' '} */}
          {/*     {paymentStatus.map((item: any) => { */}
          {/*       if (item.key === order?.paymentStatus) { */}
          {/*         return item.value; */}
          {/*       } */}
          {/*     })} */}
          {/*   </span> */}
          {/* </div> */}
          <div className="flex items-center justify-center gap-3">
            <h4 className="text-base font-semibold">Ngày đặt:</h4>
            <span>{formatDateToDMY(order?.createdAt)}</span>
          </div>
        </div>

        <div className="w-full">
          <h3 className="mt-6 text-xl font-bold">Xe đã đặt:</h3>
          <div className="my-2 flex w-full flex-col items-start justify-between gap-4">
            {order?.orderDetails?.length > 0 &&
              order?.orderDetails?.map((orderDetail: any) => (
                <div
                  className="flex w-full items-center justify-between gap-4 rounded-xl border border-gray-200 p-4"
                  key={orderDetail?.id}
                >
                  <div className="flex items-center gap-2">
                    <Image
                      src={orderDetail?.car.images[0]}
                      alt=""
                      width={100}
                      height={100}
                    />

                    <div className="flex flex-col items-start justify-between gap-2">
                      <p className="font-bold">{orderDetail?.car?.name}</p>
                      <span className="">
                        Biển số:{' '}
                        <p className="inline font-semibold">
                          {orderDetail?.car?.licensePlates}
                        </p>
                      </span>
                      <span className="">
                        Số chỗ:{' '}
                        <p className="inline font-semibold">
                          {orderDetail?.car?.seats}
                        </p>
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <span>
                      Ngày thuê:{' '}
                      <span className="font-semibold">
                        {formatDateToDMY(orderDetail?.startDate)} -{' '}
                        {formatDateToDMY(orderDetail?.endDate)}
                      </span>
                    </span>
                    <span>
                      Tổng tiền:{' '}
                      <span className="font-semibold">
                        {formatCurrency(orderDetail?.totalAmount)}
                      </span>
                    </span>
                    <span>
                      Trạng thái:{' '}
                      <span
                        className={cn(
                          'rounded-full px-3 py-1 font-semibold text-white',
                          orderDetail?.orderDetailStatus === 'PENDING'
                            ? 'bg-warning/60'
                            : orderDetail?.orderDetailStatus === 'CONFIRMED'
                            ? 'bg-info/60'
                            : orderDetail?.orderDetailStatus === 'CANCELED'
                            ? 'bg-error/60'
                            : orderDetail?.orderDetailStatus === 'COMPLETED'
                            ? 'bg-success/60'
                            : orderDetail?.orderDetailStatus === 'RECEIVED'
                            ? 'bg-info/60'
                            : 'bg-warning/60',
                        )}
                      >
                        {OrderDetailStatusEnum[orderDetail?.orderDetailStatus]}
                      </span>
                    </span>
                  </div>

                  <div className="h-[70px] w-[1px] bg-gray-200" />

                  <div className="">
                    <h5 className="font-semibold">Hành động:</h5>
                    {
                      <div className="flex flex-col gap-2">
                        {orderDetail?.orderDetailStatus === 'PENDING' && (
                          <Button
                            onClick={() => {
                              toast.success('Đã hủy đơn hàng');
                            }}
                            className="bg-error hover:bg-error/70"
                          >
                            Hủy đơn hàng
                          </Button>
                        )}
                        {orderDetail?.orderDetailStatus === 'CONFIRMED' && (
                          <Button
                            onClick={() => {
                              toast.success('Đã nhận xe');
                            }}
                            className="bg-info hover:bg-info/70"
                          >
                            Nhận xe
                          </Button>
                        )}
                        {orderDetail?.orderDetailStatus === 'RECEIVED' && (
                          <Button
                            onClick={() => {
                              toast.success('Đã trả xe');
                            }}
                            className="bg-success hover:bg-success/70"
                          >
                            Trả xe
                          </Button>
                        )}
                        {orderDetail?.orderDetailStatus === 'COMPLETED' && (
                          <Button
                            onClick={() => {
                              toast.success('Đã đánh giá');
                            }}
                            className="bg-success hover:bg-success/70"
                          >
                            Đánh giá
                          </Button>
                        )}
                      </div>
                    }
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="mt-6">
          {order?.orderDetails?.length && (
            <DataTable
              columns={columns}
              data={order?.orderDetails}
              initVisibleColumns={initVisibleColumns}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
