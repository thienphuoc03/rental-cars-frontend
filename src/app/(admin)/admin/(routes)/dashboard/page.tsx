'use client';

import { format } from 'date-fns';
import {
  CalendarIcon,
  CarFront,
  CircleDollarSign,
  ShoppingCart,
  Users,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

import RevenueStatistics from '@/app/(admin)/admin/(routes)/dashboard/revenue-statistics';
import CardAnalytic from '@/components/admin/cards/card-analytic';
import { columns } from '@/components/admin/cars/columns';
import UserStatistics from '@/components/admin/dashboard/user-statistics';
import { DataTable } from '@/components/admin/tables/data-table';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { GET_ALL_CAR_IS_RENTING, GET_ANALYTICS } from '@/lib/api-constants';
import { cn, formatCurrency } from '@/lib/utils';
import { API } from '@/services';

const DashboardPage = () => {
  const [analytics, setAnalytics] = useState<any>();
  const [carIsRenting, setCarIsRenting] = useState<any>();
  const [fromDay, setFromDay] = useState<Date | undefined>(
    new Date(new Date().getFullYear(), 0, 1),
  );
  const [toDay, setToDay] = useState<Date | undefined>(new Date());

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
          total={formatCurrency(analytics?.revenue?.totalRevenue)}
          percentage={analytics?.revenue?.revenuePercentageChange}
        />
      </div>

      <div className="grid grid-cols-7 gap-4">
        <Card className="col-span-5">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="inline">Doanh thu</CardTitle>
            <div className="inline">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    variant={'outline'}
                    className={cn(
                      'justify-start text-left font-normal',
                      !fromDay && 'text-muted-foreground',
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {fromDay ? (
                      <>{format(fromDay, 'dd/MM/yyyy')}</>
                    ) : (
                      format(
                        new Date(new Date().getFullYear(), 0, 1),
                        'dd/MM/yyyy',
                      )
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <Calendar
                    initialFocus
                    mode="single"
                    defaultMonth={fromDay}
                    selected={fromDay}
                    onSelect={setFromDay}
                    numberOfMonths={1}
                    toDate={new Date(Date.now())}
                  />
                </PopoverContent>
              </Popover>
              {' - '}
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    variant={'outline'}
                    className={cn(
                      'justify-start text-left font-normal',
                      !toDay && 'text-muted-foreground',
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {toDay ? (
                      <>{format(toDay, 'dd/MM/yyyy')}</>
                    ) : (
                      format(new Date(new Date()), 'dd/MM/yyyy')
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <Calendar
                    initialFocus
                    mode="single"
                    defaultMonth={toDay}
                    selected={toDay}
                    onSelect={setToDay}
                    numberOfMonths={1}
                    toDate={new Date(Date.now())}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </CardHeader>
          <CardContent className="pl-2">
            <RevenueStatistics fromDay={fromDay} toDay={toDay} />
          </CardContent>
        </Card>
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Người dùng</CardTitle>
            <CardContent className="pl-2">
              <UserStatistics />
            </CardContent>
          </CardHeader>
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
