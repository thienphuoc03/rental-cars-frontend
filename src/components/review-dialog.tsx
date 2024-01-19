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

interface ReviewDialogProps {
  carId: number;
  className?: string;
}

const ReviewDialog = ({ carId, className }: ReviewDialogProps) => {
  return (
    <Dialog>
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
          <ReviewForm carId={carId} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewDialog;
