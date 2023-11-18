'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

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
import { signInSchema } from '@/schemas';

export function SignInFrom() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // const dispatch = useAppDispatch();
  const router = useRouter();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (values: z.infer<typeof signInSchema>) => {
    setIsLoading(true);
    try {
      // const { data } = await SignInAPI(values);
      // console.log(values, data);
      const { data } = await axios.post(
        'http://localhost:8080/api/v1/auth/signin',
        values,
      );
      console.log(data);
      setIsLoading(false);
      // LocalStorage.add('user', JSON.stringify(data?.data?.user));
      // CookiesStorage.setCookieData('token', data?.data?.accessToken);
      // eslint-disable-next-line no-constant-condition
      if (data?.user.role === 'CUSTOMER' || 'CAROWNER') router.push('/');
      if (data?.user.role === 'ADMIN') router.push('/dashboard');
    } catch (e: any) {
      // dispatch(statusApiReducer.actions.setMessageError('Đăng nhập thất bại!'));
      console.log('that bai');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-1">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tài khoản</FormLabel>
              <FormControl>
                <Input placeholder="Tài khoản..." {...field} />
              </FormControl>
              <div className="h-4">
                <FormMessage className="text-xs" />
              </div>
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
                <div className="relative flex items-center justify-between">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Mật khẩu..."
                    {...field}
                    className="pr-9"
                  />
                  {showPassword ? (
                    <a
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2 cursor-pointer"
                    >
                      <Eye size={18} />
                    </a>
                  ) : (
                    <a
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2 cursor-pointer"
                    >
                      <EyeOff size={18} />
                    </a>
                  )}
                </div>
              </FormControl>

              <div className="h-4">
                <FormMessage className="text-xs" />
              </div>
            </FormItem>
          )}
        />

        <div className="w-full text-right text-xs hover:underline">
          <Link href="#">Quên mật khẩu?</Link>
        </div>

        <Button type="submit" className="w-full" isLoading={isLoading}>
          Đăng nhập
        </Button>
      </form>
    </Form>
  );
}
