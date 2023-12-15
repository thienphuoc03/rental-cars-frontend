import { Home } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import { SignUpFrom } from '@/components/forms/SignUpForm';
import TooltipCustom from '@/components/ui/tooltip-custom';

const SignUpPage = () => {
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
            Đăng Ký
          </h1>
          <SignUpFrom />
        </div>

        <div className="mt-8 flex items-center justify-center gap-2">
          <p className="text-base">Bạn đã có tài khoản?</p>
          <Link
            href="/signin"
            className="text-base text-primary hover:underline"
          >
            Đăng nhập
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage
