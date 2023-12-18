'use client';

import {
  CarFront,
  Heart,
  ListOrdered,
  LockKeyhole,
  LogOut,
  Map,
  User,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { ReactElement, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { CookiesStorage } from '@/config/cookie';
import { cn } from '@/lib/utils';
import { logout } from '@/stores/reducers/authReducer';
import { setDependence } from '@/stores/reducers/depReducer';

const ProfileMenu: { icon: ReactElement; href: string; label: string }[] = [
  {
    icon: <User size={24} />,
    href: '/profile',
    label: 'Tài khoản của tôi',
  },
  {
    icon: <Heart size={24} />,
    href: '/myfavs',
    label: 'Xe yêu thích',
  },
  {
    icon: <Map size={24} />,
    href: '/mytrips',
    label: 'Chuyến đi của tôi',
  },
  {
    icon: <LockKeyhole size={24} />,
    href: '/resetpw',
    label: 'Đổi mật khẩu',
  },
];

const Sidebar = ({ className }: { className?: string }) => {
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const [username, setUsername] = useState<string>('');
  const [menu, setMenu] = useState<any[]>(ProfileMenu);

  useEffect(() => {
    const userInfo: any = JSON.parse(localStorage.getItem('user') || '{}');
    if (userInfo) {
      setUsername(userInfo?.username);

      if (userInfo.role && userInfo?.role === 'CAROWNER') {
        setMenu([
          ...ProfileMenu,
          {
            icon: <CarFront size={24} />,
            href: '/mycars',
            label: 'Xe của tôi',
          },
          {
            icon: <ListOrdered size={24} />,
            href: '/myorders',
            label: 'Đơn đặt xe',
          },
        ]);
      }
    }
  }, []);

  const handleLogout = () => {
    // clear local storage
    localStorage.removeItem('user');

    // clear redux store
    dispatch(logout());
    dispatch(setDependence({}));

    // clear cookie storage
    CookiesStorage.clearAllCookies();

    setIsLogged(false);

    router.push('/');
    toast.info('Đã đăng xuất!!!');
  };

  return (
    <div className={cn('sticky top-0 z-30 p-2', className)}>
      <h2 className="text-2xl font-bold ">Xin chào {username}!</h2>

      <div className="mt-6 flex h-full w-full flex-col items-start justify-between">
        <div>
          {menu.map(({ icon, href, label }, index) => (
            <Link
              href={href}
              key={index}
              className="block w-full border-t-2 border-gray-100 py-4 text-left hover:bg-gray-100"
            >
              <div
                className={cn(
                  'flex w-full items-center justify-start px-3',
                  href === pathname
                    ? 'border-l-4 border-solid border-primary'
                    : '',
                )}
              >
                {icon}
                <span
                  className={cn(
                    'ml-2 text-base',
                    href === pathname ? 'font-bold' : '',
                  )}
                >
                  {label}
                </span>
              </div>
            </Link>
          ))}
        </div>

        <Button
          variant="outline"
          className="mt-6 flex w-full items-center justify-start gap-3 px-3 py-4 text-base font-normal hover:bg-gray-100"
          onClick={handleLogout}
          isLoading={isLogged}
        >
          <LogOut size={24} className="rotate-180" />
          Đăng xuất
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
