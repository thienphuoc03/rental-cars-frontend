'use client';

import { Check, ChevronsUpDown, SlidersHorizontal } from 'lucide-react';
import React, { useEffect, useState } from 'react';

import { cn, formatDateToDMY, formatDateToISO } from '@/lib/utils';

import { Button } from './ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from './ui/command';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { ScrollArea } from './ui/scroll-area';
import { Slider } from './ui/slider';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FilterSchema } from '@/schemas';
import { toast } from 'sonner';
import { API } from '@/services';
import { GET_BRANDS_AND_MODELS } from '@/lib/api-constants';

interface FilterDialogProps {
  className?: string;
  getCarList: any;
}

const sortList: { value: string; label: string }[] = [
  {
    value: 'asc',
    label: 'Giá từ thấp đến cao',
  },
  {
    value: 'desc',
    label: 'Giá từ cao đến thấp',
  },
];

const FilterDialog = ({ className, getCarList }: FilterDialogProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [brandData, setBrandData] = useState<any>();

  const form = useForm<z.infer<typeof FilterSchema>>({
    resolver: zodResolver(FilterSchema),
  });

  const getAllBrand = async () => {
    try {
      const res = await API.get(GET_BRANDS_AND_MODELS);
      if (res.status === 200) {
        setBrandData(res.data);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  async function onSubmit(values: z.infer<typeof FilterSchema>) {
    setIsLoading(true);
    try {
      values.sortPrice = values.sortPrice || 'asc';
      values.priceRange = values.priceRange || [300, 3000];
      values.seats = values.seats || [2, 10];
      values.brandId = values.brandId || undefined;
      values.modelId = values.modelId || undefined;

      await getCarList(values);

      // const response = await API.get(SEARCH_CARS, body);
    } catch (error: any) {
      toast.error(error?.error, { description: error?.message });
    } finally {
      setIsLoading(false);
      setIsOpen(false);
    }
  }

  useEffect(() => {
    getAllBrand();
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn('hover:shadow-2xl', className)}
        >
          <SlidersHorizontal size={16} className="mr-1" />
          Bộ lọc
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[667px] rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl">Bộ lọc</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="h-[1px] w-full bg-gray-200" />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <ScrollArea className=" w-full rounded-md border-none px-4 py-2">
              <div className="flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name="sortPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">Sắp xếp</FormLabel>
                      <FormControl>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-between"
                            >
                              {field.value
                                ? sortList.find(
                                    (sort) => sort.value === field.value,
                                  )?.label
                                : sortList[1].label}
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
                      <FormLabel className="font-bold">Mức giá</FormLabel>
                      <FormControl>
                        <Slider
                          defaultValue={[300, 3000]}
                          value={field.value}
                          min={300}
                          max={3000}
                          step={50}
                          className={cn('my-6 w-full')}
                          onValueChange={(value: number[]) => {
                            form.setValue('priceRange', value);
                          }}
                        />
                      </FormControl>
                      <div className="flex items-center justify-between">
                        <div className="rounded-md border border-solid border-gray-200 p-2 px-20 text-center">
                          <h6 className="text-xs text-gray-500">
                            Giá thấp nhất
                          </h6>
                          <p className="text-sm font-semibold">
                            {field.value ? field.value[0] : 300}K
                          </p>
                        </div>

                        <div className="h-[1px] w-4 bg-gray-500" />

                        <div className="rounded-md border border-solid border-gray-200 p-2 px-20 text-center">
                          <h6 className="text-xs text-gray-500">
                            Giá cao nhất
                          </h6>
                          <p className="text-sm font-semibold">
                            {field.value ? field.value[1] : 3000}K
                          </p>
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
                      <FormLabel className="font-bold">Số chỗ</FormLabel>
                      <FormControl>
                        <Slider
                          defaultValue={[2, 10]}
                          value={field.value}
                          min={2}
                          max={10}
                          step={1}
                          className={cn('my-6 w-full')}
                          onValueChange={(value: number[]) => {
                            form.setValue('seats', value);
                          }}
                        />
                      </FormControl>
                      <div className="flex items-center justify-between">
                        <div className="rounded-md border border-solid border-gray-200 p-2 px-20 text-center">
                          <h6 className="text-xs text-gray-500">Từ</h6>
                          <p className="text-sm font-semibold">
                            {field.value ? field.value[0] : 2}
                          </p>
                        </div>

                        <div className="h-[1px] w-4 bg-gray-500" />

                        <div className="rounded-md border border-solid border-gray-200 p-2 px-20 text-center">
                          <h6 className="text-xs text-gray-500">Đến</h6>
                          <p className="text-sm font-semibold">
                            {field.value ? field.value[1] : 10}
                          </p>
                        </div>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex flex-wrap justify-between gap-8">
                  <FormField
                    control={form.control}
                    name="brandId"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Hãng xe</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                role="combobox"
                                className={cn(
                                  'w-[250px] justify-between',
                                  !field.value && 'text-muted-foreground',
                                )}
                              >
                                {field.value
                                  ? brandData.find(
                                      (brand: any) => brand.id === field.value,
                                    ).name
                                  : 'Chọn hãng xe'}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="h-[300px] overflow-y-auto p-0">
                            <Command>
                              <CommandInput placeholder="Tìm..." />
                              <ScrollArea className="max-h-72 rounded-md">
                                <CommandEmpty>Không tìm thấy</CommandEmpty>
                                <CommandGroup>
                                  {brandData.map((brand: any) => (
                                    <CommandItem
                                      value={brand.id}
                                      key={brand.id}
                                      onSelect={() => {
                                        form.setValue('brandId', brand.id);
                                        form.setValue('modelId', 0);
                                      }}
                                    >
                                      <Check
                                        className={cn(
                                          'mr-2 h-4 w-4',
                                          brand.id === field.value
                                            ? 'opacity-100'
                                            : 'opacity-0',
                                        )}
                                      />
                                      {brand.name}
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </ScrollArea>
                            </Command>
                          </PopoverContent>
                        </Popover>
                        <FormDescription></FormDescription>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="modelId"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Mẫu xe</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                role="combobox"
                                className={cn(
                                  'w-[250px] justify-between',
                                  !field.value && 'text-muted-foreground',
                                )}
                              >
                                {form.watch('brandId')
                                  ? field.value
                                    ? brandData
                                        .find(
                                          (brand: any) =>
                                            brand.id ===
                                            Number(form.getValues('brandId')),
                                        )
                                        .models.find(
                                          (model: any) =>
                                            model.id === field.value,
                                        )?.name
                                    : 'Chọn mẫu xe'
                                  : 'Chọn hãng xe trước'}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="p-0">
                            <Command>
                              <CommandInput placeholder="Tìm..." />
                              <ScrollArea className="max-h-72 rounded-md">
                                <CommandEmpty>Không tìm thấy</CommandEmpty>
                                <CommandGroup>
                                  {form.getValues('brandId') &&
                                    brandData
                                      .find(
                                        (brand: any) =>
                                          brand.id ===
                                          Number(form.getValues('brandId')),
                                      )
                                      .models.map((model: any) => (
                                        <CommandItem
                                          value={model.id}
                                          key={model.id}
                                          onSelect={() => {
                                            form.setValue('modelId', model.id);
                                          }}
                                        >
                                          <Check
                                            className={cn(
                                              'mr-2 h-4 w-4',
                                              model.id === field.value
                                                ? 'opacity-100'
                                                : 'opacity-0',
                                            )}
                                          />
                                          {model.name}
                                        </CommandItem>
                                      ))}
                                </CommandGroup>
                              </ScrollArea>
                            </Command>
                          </PopoverContent>
                        </Popover>
                        <FormDescription></FormDescription>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </ScrollArea>

            <Button type="submit" isLoading={isLoading} className="w-full">
              Cập nhật
            </Button>
          </form>
        </Form>

        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FilterDialog;
