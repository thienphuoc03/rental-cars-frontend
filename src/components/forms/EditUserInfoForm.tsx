'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { editProfileSchema } from '@/schemas/';

const EditUserInfoForm = ({
  label,
  name,
  data,
}: {
  label: string;
  name: string;
  data: any;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm({
    resolver: zodResolver(editProfileSchema),
  });

  async function onSubmit(values: any) {
    try {
      console.log(values);
    } catch (error: any) {
      toast.error(error?.error, { description: error?.message });
    } finally {
      setIsLoading(true);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{label}:</FormLabel>
              <FormControl>
                <Input {...field} value={data ? data : ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" isLoading={isLoading} className="w-full">
          Cập nhật
        </Button>
      </form>
    </Form>
  );
};

export default EditUserInfoForm;
