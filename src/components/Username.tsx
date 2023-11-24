import { ClassValue } from 'clsx';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Skeleton } from './ui/skeleton';

const Username = ({ className }: { className?: ClassValue }) => {
  const [username, setUsername] = useState<string>(
    'https://github.com/shadcn.png',
  );
  const [avatarUrl, setAvatarUrl] = useState<string>('thienphuoc');

  // get user from local storage
  useEffect(() => {
    const userInfo: any = JSON.parse(localStorage.getItem('user') || '{}');
    if (userInfo?.avatarUrl !== null) {
      setAvatarUrl(userInfo?.avatarUrl);
    }
    setUsername(userInfo?.username);
  }, []);

  return (
    <Link href="/profile" className="flex items-center justify-center gap-2">
      <Avatar className="h-6 w-6">
        <AvatarImage src={avatarUrl} alt="Avatar" />
        <AvatarFallback>
          <Skeleton className="h-6 w-6 rounded-full" />
        </AvatarFallback>
      </Avatar>
      <p className={cn('text-base text-white', className)}>{username}</p>
    </Link>
  );
};

export default Username;
