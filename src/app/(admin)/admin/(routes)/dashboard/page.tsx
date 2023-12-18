'use client';

import { CarFront, ShoppingCart, Users } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

import CardAnalytic from '@/components/admin/cards/card-analytic';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { GET_ANALYTICS } from '@/lib/api-constants';
import { API } from '@/services';

const DashboardPage = () => {
  const [analytics, setAnalytics] = useState<any>();

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

  useEffect(() => {
    getUserAnalytics();
  }, []);

  return (
    <div className="w-full bg-white dark:bg-black">
      <div className="mb-10 grid grid-cols-3 gap-4">
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
      </div>
      <div className="grid grid-cols-7 gap-4">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">{/* <Overview /> */}</CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
            <CardDescription>You made 265 sales this month.</CardDescription>
          </CardHeader>
          <CardContent>{/* <RecentSales /> */}</CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
