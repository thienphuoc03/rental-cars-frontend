'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import { Button } from '../ui/button';
import OwnerRegistrationDialog from './owner-registration-dialog';

const Explorer = () => {
  const [isLogged, setIsLogged] = useState<boolean>(false);

  const getRole = () => {
    const userInfo: any = JSON.parse(localStorage.getItem('user') || '{}');
    if (userInfo) {
      if (userInfo.role && userInfo?.role === 'TRAVELER') {
        setIsLogged(true);
        return;
      }
    }
  };

  useEffect(() => {
    getRole();
  }, []);

  return (
    <section
      id="explorer"
      className="mt-20 flex w-full justify-center rounded-lg bg-sky-50 py-14 dark:bg-sky-900"
    >
      <div className="grid grid-cols-2 gap-10">
        <div className="col-span-1">
          <div className="flex flex-col items-center justify-center gap-10">
            <Image
              src="/icons/car-running-icon.svg"
              alt=""
              width={65}
              height={65}
            />

            <h2 className="max-w-[328px] text-center text-5xl font-bold">
              Bạn muốn cho thuê xe?
            </h2>

            <div>
              <p className="max-w-[473px] px-10 text-center">
                Hơn 5,000 chủ xe đang cho thuê hiệu quả trên Rental Cars Đăng kí
                trở thành đối tác của chúng tôi ngay hôm nay để gia tăng thu
                nhập hàng tháng.
              </p>

              <p className="mt-4 max-w-[473px] px-10 text-center">
                <strong>Rental Cars</strong> không thu phí khi bạn đăng xe. Bạn
                chỉ chia sẻ phí dịch vụ với chúng tôi khi có giao dịch cho thuê
                thành công.
              </p>
            </div>

            <div className="flex items-center justify-center gap-6">
              <Link href="/howitwork">
                <Button
                  variant="outline"
                  size="lg"
                  className="hover:shadow-2xl"
                >
                  Tìm hiểu ngay
                </Button>
              </Link>

              {isLogged && (
                // <Link href="#">
                //   <Button size="lg" className="hover:shadow-2xl">
                //     Đăng ký ngay
                //   </Button>
                // </Link>
                <OwnerRegistrationDialog />
              )}
            </div>
          </div>
        </div>

        <div className="col-span-1">
          <Image
            src="/images/explore-img.png"
            alt=""
            width={551}
            height={469}
          />
        </div>
      </div>
    </section>
  );
};

export default Explorer;
