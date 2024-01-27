import React from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import ReviewForm from './forms/review-form';
import { ReviewSchema } from '@/schemas';
import { z } from 'zod';
import { toast } from 'sonner';
import { API } from '@/services';
import { CREATE_REVIEW } from '@/lib/api-constants';

interface ReviewDialogProps {
  orderDetailId: number;
  getOrderById?: any;
  className?: string;
}

const ReviewDialog = ({
  orderDetailId,
  getOrderById,
  className,
}: ReviewDialogProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  async function onSubmit(values: z.infer<typeof ReviewSchema>) {
    try {
      const body = {
        ...values,
        orderDetailId: Number(orderDetailId),
      };

      const { data } = await API.post(CREATE_REVIEW, body);

      if (data) {
        toast.success('Đánh giá thành công');
        getOrderById();
      }
    } catch (error: any) {
      toast.error(error?.message);
    } finally {
      setIsOpen(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className={cn('', className)}>
          Đánh giá
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Đánh giá</DialogTitle>
          <DialogDescription>Đánh giá cho chuyến đi của bạn</DialogDescription>
        </DialogHeader>

        {/* content */}
        <div className="">
          <ReviewForm
            orderDetailId={orderDetailId}
            setIsOpen={setIsOpen}
            onSubmit={onSubmit}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewDialog;
