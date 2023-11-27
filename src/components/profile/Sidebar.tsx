'use client';

import { CarFront, Heart, LockKeyhole, LogOut, Map, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { ReactElement, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { CookiesStorage } from '@/config/cookie';
import { cn } from '@/lib/utils';
import { logout } from '@/stores/reducers/authReducer';

const ProfileMenu: { icon: ReactElement; href: string; label: string }[] = [
  {
    icon: <User size={24} />,
    href: '/profile',
    label: 'Tài khoản của tôi',
  },
  {
    icon: <Heart size={24} />,
    href: 'myfavs',
    label: 'Xe yêu thích',
  },
  {
    icon: <CarFront size={24} />,
    href: 'mycars',
    label: 'Xe của tôi',
  },
  {
    icon: <Map size={24} />,
    href: 'mytrips',
    label: 'Chuyến đi của tôi',
  },
  {
    icon: <LockKeyhole size={24} />,
    href: 'resetpw',
    label: 'Đổi mật khẩu',
  },
];

const Sidebar = () => {
  const [isLogged, setIsLogged] = React.useState<boolean>(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const [username, setUsername] = React.useState<string>('');

  useEffect(() => {
    const userInfo: any = JSON.parse(localStorage.getItem('user') || '{}');
    if (userInfo) {
      setUsername(userInfo?.username);
    }
  }, []);

  const handleLogout = () => {
    // clear local storage
    localStorage.removeItem('user');

    // clear redux store
    dispatch(logout());

    // clear cookie storage
    CookiesStorage.clearAllCookies();

    setIsLogged(false);

    router.push('/');
    toast.info('Đã đăng xuất!!!');
  };

  return (
    <div className="sticky top-0 z-30 w-1/3 p-2">
      <h2 className="text-2xl font-bold ">Xin chào {username}!</h2>

      <div className="mt-6">
        {ProfileMenu.map(({ icon, href, label }, index) => (
          <Link
            href={href}
            key={index}
            className="block w-full border-b-[1px] border-t-[1px] border-solid border-gray-200 py-4 text-left hover:bg-gray-100"
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
        <Button
          variant="ghost"
          className="flex w-full items-center justify-start gap-3 px-3 py-4 text-base font-normal hover:bg-gray-100"
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
