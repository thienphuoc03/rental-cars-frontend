'use client';

import {
  BaggageClaim,
  Car,
  LayoutDashboard,
  LogOut,
  Settings,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { CookiesStorage } from '@/config/cookie';
import { cn } from '@/lib/utils';
import { logout } from '@/stores/reducers/authReducer';

const menuAdmin = [
  {
    icon: <LayoutDashboard className="h-4 w-4 text-black dark:text-white" />,
    title: 'Dashboard',
    href: '/admin/dashboard',
  },
  {
    icon: <Users className="h-4 w-4 text-black dark:text-white" />,
    title: 'Người dùng',
    href: '/admin/users',
  },
  {
    icon: <Car className="h-4 w-4 text-black dark:text-white" />,
    title: 'Xe',
    href: '/admin/cars',
  },
  {
    icon: <BaggageClaim className="h-4 w-4 text-black dark:text-white" />,
    title: 'Đơn hàng',
    href: '/admin/orders',
  },
  {
    icon: <Settings className="h-4 w-4 text-black dark:text-white" />,
    title: 'Cài đặt',
    href: '/admin/settings',
  },
];

export function Sidebar({ className }: { className?: string }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    localStorage.removeItem('user');

    dispatch(logout());

    CookiesStorage.clearAllCookies();

    router.push('/signin');
    toast.info('Đã đăng xuất!!!');
  };

  return (
    <div
      className={cn(
        'sticky left-0 right-0 top-0 z-40 min-w-[183px] pb-12 shadow-xl dark:bg-black lg:min-w-fit',
        className,
      )}
    >
      <div className="h-full space-y-4 py-4">
        <div className="flex items-center justify-center">
          <h1 className="text-3xl font-bold text-primary lg:hidden">
            Rental Cars
          </h1>
        </div>

        <div className="h-full px-3 py-2">
          <div className="flex h-full flex-col items-start justify-between">
            <div className="w-full">
              <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight lg:hidden">
                Dashboard
              </h2>
              <div className="space-y-1 rounded lg:bg-slate-50">
                {menuAdmin.map((item) => (
                  <Link
                    href={item.href}
                    key={item.href}
                    className={cn(
                      'flex items-center justify-start gap-2 rounded px-4 py-3 transition-colors duration-200' +
                        'hover:bg-slate-100 active:scale-95 dark:bg-slate-800 dark:hover:bg-slate-600',
                      pathname.startsWith(item.href) &&
                        'bg-slate-200 dark:bg-slate-500',
                    )}
                  >
                    {item.icon}
                    <span className="text-sm font-medium lg:hidden">
                      {item.title}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="w-full">
              <Button
                variant="outline"
                className="w-full justify-start bg-slate-50 dark:bg-black lg:w-auto"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 rotate-180 text-black dark:text-white" />
                <p className="ml-1 lg:hidden">Sign out</p>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
