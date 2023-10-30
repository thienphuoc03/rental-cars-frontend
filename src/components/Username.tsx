import { ClassValue } from 'clsx';
import { ChevronDown } from 'lucide-react';
import React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Skeleton } from './ui/skeleton';

import { cn } from '@/lib/utils';

const Username = ({ className }: { className?: ClassValue }) => {
  return (
    <div className="flex justify-center items-center gap-2">
      <Avatar className="w-6 h-6">
        <AvatarImage src="https://github.com/shadcn.png" alt="Avatar" />
        <AvatarFallback>
          <Skeleton className="h-6 w-6 rounded-full" />
        </AvatarFallback>
      </Avatar>
      <p className={cn('text-base text-white', className)}>ThienPhuoc</p>
      <ChevronDown size={16} className={cn('text-white', className)} />
    </div>
  );
};

export default Username;
