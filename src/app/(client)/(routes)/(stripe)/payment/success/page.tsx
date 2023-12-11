'use client';

import { BadgeAlert, BadgeCheck } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';

import { CREATE_ORDER, GET_SESSION_BY_ID } from '@/lib/api-constants';
import { formatCurrency } from '@/lib/utils';
import { API } from '@/services';
import { clearCart } from '@/stores/reducers/cartReducer';

const PaymentSuccessPage = () => {
  const [session, setSession] = useState<any>(null);
  const dispatch = useDispatch();

  const createOrder = async () => {
    try {
      const cartStore = JSON.parse(
        localStorage.getItem('cart-storage') || '{}',
      );

      if (cartStore.items.length > 0) {
        const res = await API.post(CREATE_ORDER, cartStore);

        if (res?.data?.id) {
          dispatch(clearCart());
          localStorage.setItem('checkout_session_id', '');
        }
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const getSession = async () => {
    try {
      const sessionId = localStorage.getItem('checkout_session_id');

      if (!sessionId) {
        toast.error('Session id is not set');
        return;
      }

      const { data } = await API.get(GET_SESSION_BY_ID + `/${sessionId}`);

      setSession(data);

      if (data?.payment_status === 'paid') {
        createOrder();
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getSession();
  }, []);

  return (
    <div className="my-10 flex items-center justify-center text-gray-500">
      <div className="rounded-2xl bg-transparent shadow-xl">
        {session ? (
          <>
            <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-gray-100 bg-white px-20 py-8">
              <BadgeCheck className="h-16 w-16 text-success" />
              <h1 className="text-center text-3xl font-bold text-success">
                Thanh toán thành công
              </h1>
              <p className="text-center text-sm dark:text-gray-500">
                Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi
              </p>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white px-20 py-8">
              <div className="flex items-center justify-between gap-2">
                <span>Tổng tiền:</span>
                <span>{formatCurrency(session?.amount_total)}</span>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-gray-100 bg-white px-20 py-8">
              <BadgeAlert className="h-16 w-16 text-info" />
              <h1 className="text-center text-3xl font-bold text-info">
                Chưa có thông tin thanh toán
              </h1>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
