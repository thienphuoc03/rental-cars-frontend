'use client';

import { Button } from '@/components/ui/button';
import { ReviewSchema } from '@/schemas';
import { API } from '@/services';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '../ui/form';
import StarRatings from 'react-star-ratings';
import { Textarea } from '../ui/textarea';
import { CREATE_REVIEW } from '@/lib/api-constants';

const ReviewForm = ({ carId }: { carId: number }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof ReviewSchema>>({
    resolver: zodResolver(ReviewSchema),
  });

  async function onSubmit(values: z.infer<typeof ReviewSchema>) {
    setIsLoading(true);
    try {
      const body = {
        ...values,
        carId: Number(carId),
      };

      const { data } = await API.post(CREATE_REVIEW, body);

      if (data) {
        toast.success('Đánh giá thành công');
        form.reset();
      }
    } catch (error: any) {
      toast.error(error?.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex flex-col items-start justify-between gap-6">
          <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
              <FormItem className="w-full text-center">
                <FormControl>
                  <StarRatings
                    rating={field.value}
                    starRatedColor="yellow"
                    starHoverColor="yellow"
                    changeRating={(newRating) => {
                      field.onChange(newRating);
                    }}
                    numberOfStars={5}
                    name="rating"
                    starDimension="25px"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Textarea
                    placeholder="Nhập đánh giá của bạn về chuyến đi..."
                    {...field}
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="text-right">
          <Button type="submit" className="w-44 px-8" isLoading={isLoading}>
            Đánh giá
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ReviewForm;
