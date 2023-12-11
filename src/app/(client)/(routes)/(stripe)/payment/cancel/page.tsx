import { BadgeAlert } from 'lucide-react';
import React from 'react';

const PaymentCancelPage = () => {
  return (
    <div className="my-10 flex items-center justify-center text-gray-500">
      <div className="rounded-2xl bg-transparent shadow-xl">
        <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-gray-100 bg-white px-20 py-8">
          <BadgeAlert className="h-16 w-16 text-error" />
          <h1 className="text-center text-3xl font-bold text-error">
            Thanh toán thất bại
          </h1>
          <p className="text-center text-sm dark:text-gray-500">
            Vui lòng thử lại sau
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancelPage;
