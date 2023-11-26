'use client';

import { Camera } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const AvatarDialog = ({
  src,
  className,
}: {
  src: string;
  className: string;
}) => {
  const [avatarUrl, setAvatarUrl] = useState<string>(src);

  useEffect(() => {
    setAvatarUrl(src);
  }, []);

  function handleFileChange(e: any) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setAvatarUrl(reader.result as string);
    };
  }

  function handleCancer() {
    setAvatarUrl(src);
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className={cn('flex items-center justify-center', className)}>
          <Camera className="h-8 w-8 text-gray-300" />
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Cập nhật ảnh đại diện</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription className="flex items-center justify-center border">
          {avatarUrl && (
            <Image src={avatarUrl} alt="avatar" width={146} height={146} />
          )}
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancer}>Hủy</AlertDialogCancel>
          <Input
            type="file"
            onChange={handleFileChange}
            name="avatarUrl"
            className="mb-2 cursor-pointer bg-primary text-white"
          />
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AvatarDialog;
