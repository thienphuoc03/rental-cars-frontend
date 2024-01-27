'use client';

import React, { useState, useEffect } from 'react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { API } from '@/services';
import {
  UPDATE_CAR_STATUS,
  UPDATE_REQUEST_OWNER_REGISTRATION,
} from '@/lib/api-constants';

interface ConfirmCarRegistrationAlertDialogProps {
  row: any;
  title: string;
  status: string;
  className?: string;
}

const ConfirmCarRegistrationAlertDialog = ({
  row,
  title,
  status,
  className,
}: ConfirmCarRegistrationAlertDialogProps) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const updateCarStatus = async () => {
    try {
      const id = row.original.id;

      const res = await API.patch(`${UPDATE_CAR_STATUS}/${id}`, {
        status,
      });

      if (res.status === 200) {
        toast.success('Cập nhật thành công');
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className={cn('', className)}>{title}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {status === 'AVAILABLE'
              ? 'Xác nhận yêu cầu đăng ký'
              : 'Xác nhận từ chối yêu cầu đăng ký'}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {status ? (
              <>
                Xe <strong>{row.original.name}</strong> sẽ được cấp phép cho
                thuê
              </>
            ) : (
              <>
                Yêu cầu đăng ký xe <strong>{row.original.name}</strong> sẽ bị từ
                chối
              </>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Trở về</AlertDialogCancel>
          <AlertDialogAction onClick={updateCarStatus}>
            Xác nhận
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmCarRegistrationAlertDialog;
