import { Home } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import { SignInFrom } from '@/components/forms/SignInForm';
import TooltipCustom from '@/components/ui/tooltip-custom';

const SignInPage = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="rounded-lg bg-white p-12 shadow-2xl">
        <TooltipCustom content="Trang chủ">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-solid border-slate-200 p-2"
          >
            <Home size={16} className="hover:scale-125" />
          </Link>
        </TooltipCustom>

        <div className="w-96 max-w-sm">
          <h1 className="mb-5 text-center text-3xl font-bold text-blue-800">
            Đăng nhập
          </h1>
          <SignInFrom />
        </div>

        <div className="mt-8 flex items-center justify-center gap-2">
          <p className="text-base">Bạn chưa có tài khoản?</p>
          <Link
            href="/signup"
            className="text-base text-primary hover:underline"
          >
            Đăng ký
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
