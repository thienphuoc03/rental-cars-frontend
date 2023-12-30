'use client';

import { CarFront, CircleDollarSign, ShoppingCart, Users } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

import CardAnalytic from '@/components/admin/cards/card-analytic';
import { columns } from '@/components/admin/cars/columns';
import UserStatistics from '@/components/admin/dashboard/user-statistics';
import { DataTable } from '@/components/admin/tables/data-table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GET_ALL_CAR_IS_RENTING, GET_ANALYTICS } from '@/lib/api-constants';
import { formatCurrency } from '@/lib/utils';
import { API } from '@/services';

const DashboardPage = () => {
  const [analytics, setAnalytics] = useState<any>();
  const [carIsRenting, setCarIsRenting] = useState<any>();

  const getUserAnalytics = async () => {
    try {
      const res = await API.get(GET_ANALYTICS);

      if (res.status === 200) {
        setAnalytics(res.data);
      }
    } catch (e: any) {
      toast.error(e.error, {
        description: e.message,
      });
    }
  };

  const getAllCarIsRenting = async () => {
    try {
      const res = await API.get(GET_ALL_CAR_IS_RENTING);

      if (res.status === 200) {
        setCarIsRenting(res.data);
        return;
      }
    } catch (e: any) {
      toast.error(e.error, {
        description: e.message,
      });
    }
  };

  useEffect(() => {
    getUserAnalytics();
    getAllCarIsRenting();
  }, []);

  const doanhthu = {
    totalAmount: 60000000,
    amountPercentageChange: 10,
  };

  return (
    <div className="w-full bg-white dark:bg-black">
      <div className="mb-10 grid grid-cols-4 gap-4">
        <CardAnalytic
          title="Người dùng"
          icon={<Users className="h-4 w-4 text-gray-500" />}
          total={analytics?.user?.totalUsers}
          percentage={analytics?.user?.userPercentageChange}
        />
        <CardAnalytic
          title="Phương tiện"
          icon={<CarFront className="h-4 w-4 text-gray-500" />}
          total={analytics?.car?.totalCars}
          percentage={analytics?.car?.carPercentageChange}
        />
        <CardAnalytic
          title="Đơn hàng"
          icon={<ShoppingCart className="h-4 w-4 text-gray-500" />}
          total={analytics?.order?.totalOrders}
          percentage={analytics?.order?.orderPercentageChange}
        />
        <CardAnalytic
          title="Doanh thu"
          icon={<CircleDollarSign className="h-4 w-4 text-gray-500" />}
          total={formatCurrency(doanhthu.totalAmount)}
          percentage={doanhthu.amountPercentageChange}
        />
      </div>

      <div className="grid grid-cols-7 gap-4">
        <Card className="col-span-5">
          <CardHeader>
            <CardTitle>Doanh thu</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">{/* <Overview /> */}</CardContent>
        </Card>
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Người dùng</CardTitle>
            <CardContent className="pl-2">
              <UserStatistics />
            </CardContent>
          </CardHeader>
          <CardContent>{/* <RecentSales /> */}</CardContent>
        </Card>
      </div>

      <div className="mt-6 w-full">
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Xe đang cho thuê</CardTitle>
          </CardHeader>
          <CardContent>
            {carIsRenting && (
              <DataTable
                columns={columns}
                data={carIsRenting}
                search="name"
                initVisibleColumns={[
                  'name',
                  'pricePerDay',
                  'brand',
                  'model',
                  'createdAt',
                  'status',
                ]}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
