'use client';

import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { useEffect, useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FilterSchema } from '@/schemas';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Check, ChevronsUpDown } from 'lucide-react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from '../ui/command';
import { cn } from '@/lib/utils';
import { Slider } from '../ui/slider';

const sortList: { value: string; label: string }[] = [
  {
    value: 'price-asc',
    label: 'Giá từ thấp đến cao',
  },
  {
    value: 'price-desc',
    label: 'Giá từ cao đến thấp',
  },
];

const FilterForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof FilterSchema>>({
    resolver: zodResolver(FilterSchema),
  });

  async function onSubmit(values: z.infer<typeof FilterSchema>) {
    setIsLoading(true);
    try {
      console.log('values');
      console.log(values);
    } catch (error: any) {
      toast.error(error?.error, { description: error?.message });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="sortPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sắp xếp</FormLabel>
              <FormControl>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-between"
                    >
                      {field.value
                        ? sortList.find((sort) => sort.value === field.value)
                            ?.label
                        : sortList[2].label}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command className="w-full">
                      <CommandEmpty></CommandEmpty>
                      <CommandGroup className="w-full">
                        {sortList.map((sort) => (
                          <CommandItem
                            key={sort.value}
                            value={sort.value}
                            className="w-full"
                            onSelect={() => {
                              form.setValue('sortPrice', sort.value);
                            }}
                          >
                            <Check
                              className={cn(
                                'mr-2 h-4 w-4',
                                field.value === sort.value
                                  ? 'opacity-100'
                                  : 'opacity-0',
                              )}
                            />
                            {sort.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="priceRange"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mức giá</FormLabel>
              <FormControl>
                <Slider
                  defaultValue={[300, 3000]}
                  value={field.value}
                  min={300}
                  max={3000}
                  step={50}
                  className={cn('my-6 w-full')}
                  onValueChange={() => {
                    form.setValue('priceRange', field.value);
                  }}
                />
              </FormControl>
              <div className="flex items-center justify-between">
                <div className="rounded-md border border-solid border-gray-200 p-2 px-20 text-center">
                  <h6 className="text-xs text-gray-500">Giá thấp nhất</h6>
                  <p className="text-sm font-semibold">{field.value}K</p>
                </div>

                <div className="h-[1px] w-4 bg-gray-500" />

                <div className="rounded-md border border-solid border-gray-200 p-2 px-20 text-center">
                  <h6 className="text-xs text-gray-500">Giá cao nhất</h6>
                  <p className="text-sm font-semibold">{field.value}K</p>
                </div>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="seats"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Số chỗ</FormLabel>
              <FormControl>
                <Slider
                  defaultValue={[300, 3000]}
                  min={300}
                  max={3000}
                  step={50}
                  className={cn('my-6 w-full')}
                  onValueChange={() => {
                    form.setValue('seats', field.value);
                  }}
                />
              </FormControl>
              <div className="flex items-center justify-between">
                <div className="rounded-md border border-solid border-gray-200 p-2 px-20 text-center">
                  <h6 className="text-xs text-gray-500">Giá thấp nhất</h6>
                  <p className="text-sm font-semibold">{field.value}K</p>
                </div>

                <div className="h-[1px] w-4 bg-gray-500" />

                <div className="rounded-md border border-solid border-gray-200 p-2 px-20 text-center">
                  <h6 className="text-xs text-gray-500">Giá cao nhất</h6>
                  <p className="text-sm font-semibold">{field.value}K</p>
                </div>
              </div>
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

export default FilterForm;
