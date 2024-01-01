'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UPDATE_ORDER_DETAIL_STATUS_BY_ID } from '@/lib/api-constants';
import { cn } from '@/lib/utils';
import { API } from '@/services';
import { setDependence } from '@/stores/reducers/depReducer';

interface UpdateOrderDetailDialogProps {
  title: string;
  orderDetailId: number;
  orderDetailStatus: string;
  carId: number;
  className?: string;
}

const UpdateOrderDetailDialog = ({
  title,
  orderDetailId,
  orderDetailStatus,
  carId,
  className,
}: UpdateOrderDetailDialogProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [note, setNote] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  const submit = async () => {
    setIsLoading(true);
    try {
      let body: any = {
        orderDetailStatus,
        carId,
      };

      if (orderDetailStatus === 'CANCELED' && note) {
        body = {
          ...body,
          note,
          paymentStatus: 'REFUND',
        };
      }

      const res = await API.patch(
        UPDATE_ORDER_DETAIL_STATUS_BY_ID + `/${orderDetailId}`,
        body,
      );

      if (res.status === 200) {
        dispatch(setDependence({}));
        toast.success('Cập nhật trạng thái đơn hàng thành công');
        setOpen(false);
      }

      setIsLoading(false);
    } catch (error: any) {
      toast.error(error.message);
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={cn('min-w-[92px] bg-info', className)}>
          {title}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[425px]">
        <DialogHeader className="mb-4">
          <DialogTitle>Cập nhật trạng thái đơn hàng</DialogTitle>
          <DialogDescription>
            <p className="inline font-bold">{title}</p> đơn hàng này?
          </DialogDescription>
        </DialogHeader>
        {orderDetailStatus === 'CANCELED' && (
          <div className="grid gap-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="note" className="text-right">
                Chú thích
              </Label>
              <Input
                id="note"
                className="col-span-3"
                required={true}
                onChange={(event) => setNote(event.target.value)}
              />
            </div>
          </div>
        )}

        <DialogFooter className="mt-4">
          <Button type="submit" onClick={submit} isLoading={isLoading}>
            Cập nhật
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateOrderDetailDialog;
