'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
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
import { signUpSchema } from '@/schemas';

export function SignUpFrom() {
  const [showPassword, setShowPassword] = useState<Boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<Boolean>(false);

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof signUpSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1">
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email..." {...field} />
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
                <div className="flex justify-between items-center relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Mật khẩu..."
                    {...field}
                    className="pr-9"
                  />
                  {showPassword ? (
                    <a
                      onClick={() => setShowPassword(!showPassword)}
                      className="cursor-pointer absolute right-2"
                    >
                      <Eye size={18} />
                    </a>
                  ) : (
                    <a
                      onClick={() => setShowPassword(!showPassword)}
                      className="cursor-pointer absolute right-2"
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

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Xác nhận mật khẩu</FormLabel>
              <FormControl>
                <div className="flex justify-between items-center relative">
                  <Input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Mật khẩu..."
                    {...field}
                    className="pr-9"
                  />
                  {showConfirmPassword ? (
                    <a
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="cursor-pointer absolute right-2"
                    >
                      <Eye size={18} />
                    </a>
                  ) : (
                    <a
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="cursor-pointer absolute right-2"
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

        <Button type="submit" className="w-full">
          Đăng ký
        </Button>
      </form>
    </Form>
  );
}
