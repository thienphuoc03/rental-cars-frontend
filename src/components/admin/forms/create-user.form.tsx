'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon, Check, ChevronsUpDown } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import createUserSchema from '@/components/admin/schemas/create-user.schema';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CREATE_USER } from '@/lib/api-constants';
import { cn, convertBase64 } from '@/lib/utils';
import { API } from '@/services';

const genders = [
  {
    key: 'MALE',
    value: 'Nam',
  },
  {
    key: 'FEMALE',
    value: 'Nữ',
  },
  {
    key: 'OTHER',
    value: 'Khác',
  },
];

const roles = [
  {
    key: 'ADMIN',
    value: 'Quản trị viên',
  },
  {
    key: 'CAROWNER',
    value: 'Chủ xe',
  },
  {
    key: 'TRAVELER',
    value: 'Người thuê xe',
  },
];

export function CreateUserForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<any>();
  const [avatarSrc, setAvatarSrc] = useState<any>();

  const form = useForm<z.infer<typeof createUserSchema>>({
    resolver: zodResolver(createUserSchema),
  });

  async function onSubmit(values: z.infer<typeof createUserSchema>) {
    setIsLoading(true);
    try {
      values.avatarUrl = avatarSrc;

      console.log({ values });

      // Update the values with the avatarUrl
      const { data } = await API.post(CREATE_USER, values);

      if (data) {
        toast.success('Tạo người dùng thành công!');
        setIsLoading(false);
        router.push('/admin/users');
      }

      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error?.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="avatarUrl"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center justify-center gap-1">
              <div className="h-28 w-28 overflow-hidden bg-slate-100">
                {avatarSrc && (
                  <Image
                    src={avatarSrc}
                    alt="avatar"
                    width={112}
                    height={112}
                  />
                )}
              </div>
              <FormLabel className="block w-28 cursor-pointer rounded border border-gray-200 px-3 py-2 text-center active:scale-95">
                Chọn Avatar
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setSelectedImage(file);

                      convertBase64(file).then((res) => setAvatarSrc(res));
                    }
                    field.onChange(e);
                  }}
                  required={false}
                />
              </FormControl>
              <FormDescription className="text-xs"></FormDescription>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Họ tên</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription className="text-xs">
                Chúng tôi khuyến khích bạn sử dụng tên thật của mình.
              </FormDescription>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên tài khoản</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription className="text-xs">
                Tên tài khoản dùng để đăng nhập. (*yêu cầu: chữ thường, viết
                liền, không dấu)
              </FormDescription>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mật khẩu</FormLabel>
              <FormControl>
                <Input {...field} type="password" />
              </FormControl>
              <FormDescription className="text-xs"></FormDescription>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription className="text-xs">
                Các thông báo quan trọng sẽ được gửi đến địa chỉ email này.
              </FormDescription>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Số điện thoại</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription className="text-xs"></FormDescription>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Địa chỉ</FormLabel>
              <FormControl>
                <Input {...field} required={false} />
              </FormControl>
              <FormDescription className="text-xs">
                Các thông báo quan trọng sẽ được gửi đến địa chỉ email này.
              </FormDescription>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dateOfBirth"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Ngày sinh</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-[240px] pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground',
                      )}
                    >
                      {field.value ? (
                        format(field.value, 'dd/MM/yyyy')
                      ) : (
                        <span>Chọn ngày</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date('1900-01-01')
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription></FormDescription>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Giới tính</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        'w-[240px] justify-between',
                        !field.value && 'text-muted-foreground',
                      )}
                    >
                      {field.value
                        ? genders.find((gender) => gender.key === field.value)
                            ?.value
                        : 'Chọn giới tính'}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[240px] p-0">
                  <Command>
                    <CommandInput placeholder="Tìm..." />
                    <CommandEmpty>Không tìm thấy</CommandEmpty>
                    <CommandGroup>
                      {genders.map((gender) => (
                        <CommandItem
                          value={gender.key}
                          key={gender.key}
                          onSelect={() => {
                            form.setValue('gender', gender.key);
                          }}
                        >
                          <Check
                            className={cn(
                              'mr-2 h-4 w-4',
                              gender.key === field.value
                                ? 'opacity-100'
                                : 'opacity-0',
                            )}
                          />
                          {gender.value}
                        </CommandItem>
                      ))}
                    </CommandGroup>
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
          name="role"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Loại tài khoản</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        'w-[240px] justify-between',
                        !field.value && 'text-muted-foreground',
                      )}
                    >
                      {field.value
                        ? roles.find((role) => role.key === field.value)?.value
                        : 'Chọn vai trò'}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[240px] p-0">
                  <Command>
                    <CommandInput placeholder="Tìm..." />
                    <CommandEmpty>Không tìm thấy</CommandEmpty>
                    <CommandGroup>
                      {roles.map((role) => (
                        <CommandItem
                          value={role.key}
                          key={role.key}
                          onSelect={() => {
                            form.setValue('role', role.key);
                          }}
                        >
                          <Check
                            className={cn(
                              'mr-2 h-4 w-4',
                              role.key === field.value
                                ? 'opacity-100'
                                : 'opacity-0',
                            )}
                          />
                          {role.value}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription></FormDescription>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <div className="text-right">
          <Button type="submit" className="px-8" isLoading={isLoading}>
            Lưu
          </Button>
        </div>
      </form>
    </Form>
  );
}
