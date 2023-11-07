import { Home } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import { SignUpFrom } from '@/components/forms/SignUpForm';
import TooltipCustom from '@/components/ui/tooltip-custom';

const SignUpPage = () => {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="bg-white p-12 rounded-lg shadow-2xl">
        <TooltipCustom content="Trang chủ">
          <Link
            href="/"
            className="inline-flex justify-center items-center rounded-full p-2 border border-solid border-slate-200"
          >
            <Home size={16} className="hover:scale-125" />
          </Link>
        </TooltipCustom>

        <div className="w-96 max-w-sm">
          <h1 className="text-center text-3xl font-bold mb-5 text-blue-800">
            Đăng Ký
          </h1>
          <SignUpFrom />
        </div>

        <div className="flex justify-center items-center gap-2 mt-8">
          <p className="text-base">Bạn đã có tài khoản?</p>
          <Link
            href="/signin"
            className="text-primary text-base hover:underline"
          >
            Đăng nhập
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
