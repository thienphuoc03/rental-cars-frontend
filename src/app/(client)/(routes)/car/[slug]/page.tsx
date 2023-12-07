'use client';

import { addDays } from 'date-fns';
import { AlertCircle, Armchair, Fuel, Info, Settings2 } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';

import HoverCardCustom from '@/components/cards/hover-card-custom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import StarRating from '@/components/ui/star-rating';
import { UserInfoAlertDialog } from '@/components/user-info-alert-dialog';
import { GET_CAR_BY_SLUG } from '@/lib/api-constants';
import { countDays, formatCurrency, formatDateToDMY } from '@/lib/utils';
import { API } from '@/services';
import { addItem } from '@/stores/reducers/cartReducer';
import { FeatureNameEnum, FuelEnum, TransmissionEnum } from '@/types/enums';

const menuItems = [
  {
    name: 'Hình ảnh',
    href: '#hinh-anh',
  },
  {
    name: 'Đặc điểm',
    href: '#dac-diem',
  },
  {
    name: 'Giấy tờ thuê xe',
    href: '#giay-to-thue-xe',
  },
  {
    name: 'Chủ xe',
    href: '#chu-xe',
  },
];

const surcharges: { name: string; price: string; description: string }[] = [
  {
    name: 'Phí vượt giới hạn',
    price: '5 000đ/km',
    description:
      'Phụ phí phát sinh nếu lộ trình di chuyển vượt quá 900km khi thuê xe 3 ngày',
  },
  {
    name: 'Phí quá giờ',
    price: '80 000đ/h',
    description:
      'Phụ phí phát sinh nếu hoàn trả xe trễ giờ. Trường hợp trễ quá 5 tiếng, phụ phí thêm 1 ngày thuê',
  },
  {
    name: 'Phí vệ sinh',
    price: '100 000đ',
    description:
      'Phụ phí phát sinh khi xe hoàn trả không đảm bảo vệ sinh (nhiều vết bẩn, bùn cát, sình lầy...)',
  },
  {
    name: 'Phí khử mùi',
    price: '450 000đ',
    description:
      'Phụ phí phát sinh khi xe hoàn trả bị ám mùi khó chịu (mùi thuốc lá, thực phẩm nặng mùi...)',
  },
];

const CarPage = ({ params }: { params: { slug: string } }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(Date.now()),
    to: addDays(new Date(Date.now()), 1),
  });
  const [car, setCar] = useState<any>(null);
  const dispatch = useDispatch();

  const getCar = async () => {
    const slug = params.slug;

    const response = await API.get(GET_CAR_BY_SLUG + `/${slug}`);

    setCar(response.data);
  };

  useEffect(() => {
    getCar();
  }, []);

  // set date from calendar
  const handleDate = (from: Date | undefined, to: Date | undefined) => {
    if (!from || !to) return;
    setDate({ from, to });
  };

  const handleRentCar = (
    car: any,
    startDate: Date | undefined,
    endDate: Date | undefined,
    price: number,
  ) => {
    setIsLoading(true);
    try {
      const user = localStorage.getItem('user');

      const userObj = user ? JSON.parse(user) : undefined;

      if (!userObj) {
        toast.error('Bạn cần đăng nhập để thuê xe');
        return;
      }

      if (!startDate || !endDate) return;

      const startDateString = formatDateToDMY(startDate);
      const endDateString = formatDateToDMY(endDate);

      const carItem = {
        carId: Number(car.id),
        carName: car.name,
        images: car.images,
        priceOfDay: car.pricePerDay,
        startDate: startDateString,
        endDate: endDateString,
        totalAmount: price,
      };

      dispatch(addItem(carItem));
    } catch (error: any) {
      toast.error(error?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="my-4">
      {/*stick menu*/}
      <nav className="sticky top-2 z-30 mb-14 w-full rounded-lg border border-gray-200 bg-white shadow">
        <div className="flex items-center justify-start pl-8">
          {menuItems.map((item, index) => (
            <a
              href={item.href}
              className="inline-block px-4 py-3 font-medium text-gray-700 hover:text-gray-900"
              key={index}
            >
              {item.name}
            </a>
          ))}
        </div>
      </nav>

      {/* images */}
      <div
        className="mt-4 flex items-center justify-between gap-3"
        id="hinh-anh"
      >
        <div className="h-full overflow-hidden rounded-xl">
          <Image
            src={car?.images[0]}
            alt=""
            width={854}
            height={0}
            style={{
              objectFit: 'cover',
              maxWidth: '854px',
              maxHeight: '600px',
            }}
          />
        </div>

        <div className="">
          <div className="flex flex-col items-stretch justify-between gap-3">
            {car?.images.slice(1, 4).map((image: any, index: number) => (
              <div
                className="row-span-1 overflow-hidden rounded-xl"
                key={index}
              >
                <Image
                  src={image}
                  alt=""
                  width={410}
                  height={190}
                  style={{
                    maxWidth: '410px',
                    maxHeight: '190px',
                    objectFit: 'cover',
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Car info */}
      <div className="mt-6 flex items-start justify-between gap-6">
        <div className="w-2/3 rounded-lg bg-white p-8">
          {/* info */}
          <div className="flex flex-col items-start justify-center">
            <h2 className="text-4xl font-bold">{car?.name}</h2>
            <div className="flex items-center justify-between gap-3 text-gray-500">
              <span className="flex items-center justify-center gap-1">
                <Image
                  src="/icons/star-rating-icon.svg"
                  alt=""
                  width={16}
                  height={17}
                />
                <p>{car?.rating}</p>
              </span>
              •
              <span className="flex items-center justify-center gap-1">
                <Image
                  src="/icons/suitcase-icon.svg"
                  alt=""
                  width={16}
                  height={17}
                />
                <p>{car?.trips} chuyến</p>
              </span>
              •
              <span className="flex items-center justify-center gap-1">
                <p>{car?.address}</p>
              </span>
            </div>
          </div>

          <div className="my-6 h-[1px] w-full bg-gray-300" />

          {/* characteristics */}
          <div className="" id="dac-diem">
            <h3 className="mb-4 text-xl font-medium">Đặc điểm</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center justify-center gap-2">
                <Armchair className="h-8 w-8 text-primary" />
                <div className="flex flex-col items-center justify-between text-base">
                  <span className="text-gray-500">Số ghế</span>
                  <span className="font-medium">{car?.seats} chỗ</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2">
                <Settings2 className="h-8 w-8 text-primary" />
                <div className="flex flex-col items-center justify-between text-base">
                  <span className="text-gray-500">Truyền động</span>
                  <span className="font-medium">
                    {TransmissionEnum[car?.transmission]}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2">
                <Fuel className="h-8 w-8 text-primary" />
                <div className="flex flex-col items-center justify-between text-base">
                  <span className="text-gray-500">Nhiên liệu</span>
                  <span className="font-medium">{FuelEnum[car?.fuel]}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="my-6 h-[1px] w-full bg-gray-300" />

          {/* description */}
          <div className="">
            <h3 className="mb-4 text-xl font-medium">Mô tả</h3>
            <div>
              <p className="text-align text-base text-gray-600">
                {car?.description}
              </p>
            </div>
          </div>

          <div className="my-6 h-[1px] w-full bg-gray-300" />

          {/* features */}
          <div className="">
            <h3 className="mb-4 text-xl font-medium">Tính năng</h3>
            <div className="grid grid-cols-4 gap-3">
              {car?.CarFeature.map((feature: string, index: number) => (
                <span
                  className="col-span-1 cursor-pointer rounded border border-gray-300 px-3 py-2 text-center shadow hover:scale-105"
                  key={index}
                >
                  <p className="text-base text-gray-600">
                    {FeatureNameEnum[feature]}
                  </p>
                </span>
              ))}
            </div>
          </div>

          <div className="my-6 h-[1px] w-full bg-gray-300" />

          {/* Giấy tờ thuê xe */}
          <div className="" id="giay-to-thue-xe">
            <div className="flex items-center justify-start gap-2">
              <h3 className="mb-4 text-xl font-medium">Giấy tờ thuê xe</h3>
            </div>
            <div className="rounded-lg border-l-4 border-orange-500 bg-orange-100/50 p-4">
              <div className="flex items-center justify-start gap-2">
                <Info className="h-4 w-4 text-gray-600" />
                <span className="text-xs text-gray-500">
                  Chọn 1 trong 2 hình thức
                </span>
              </div>

              <div className="my-3 flex items-center justify-start gap-2">
                <Image
                  src="/images/gplx_cccd.png"
                  alt=""
                  width={24}
                  height={24}
                />
                <span className="text-base font-medium text-gray-900">
                  GPLX & CCCD gắn chip (đối chiếu)
                </span>
              </div>

              <div className="flex items-center justify-start gap-2">
                <Image
                  src="/images/gplx_passport.png"
                  alt=""
                  width={24}
                  height={24}
                />
                <span className="text-base font-medium text-gray-900">
                  GPLX (đối chiếu) & Passport (giữ lại)
                </span>
              </div>
            </div>
          </div>

          <div className="my-6 h-[1px] w-full bg-gray-300" />

          {/* Tài sản thế chấp */}
          <div className="">
            <h3 className="mb-4 text-xl font-medium">Tài sản thế chấp</h3>
            <div className="rounded-lg border-l-4 border-orange-500 bg-orange-100/50 p-4">
              <div className="flex items-center justify-start gap-2">
                <span className="text-base text-gray-800">
                  15 triệu (tiền mặt/chuyển khoản cho chủ xe khi nhận xe) hoặc
                  Xe máy (kèm cà vẹt gốc) giá trị 15 triệu
                </span>
              </div>
            </div>
          </div>

          <div className="my-6 h-[1px] w-full bg-gray-300" />

          {/* Điều khoản */}
          <div className="">
            <h3 className="mb-4 text-xl font-medium">Điều khoản</h3>

            <div className="text-gray-500">
              <span>Quy định khác:</span>
              <ul className="pl-6">
                <li className="list-disc">Sử dụng xe đúng mục đích.</li>
                <li className="list-disc">
                  Không sử dụng xe thuê vào mục đích phi pháp, trái pháp luật.
                </li>
                <li className="list-disc">
                  Không sử dụng xe thuê để cầm cố, thế chấp.
                </li>
                <li className="list-disc">
                  Không hút thuốc, nhả kẹo cao su, xả rác trong xe.
                </li>
                <li className="list-disc">
                  Không chở hàng quốc cấm dễ cháy nổ.
                </li>
                <li className="list-disc">
                  Không chở hoa quả, thực phẩm nặng mùi trong xe.
                </li>
                <li className="list-disc">
                  Khi trả xe, nếu xe bẩn hoặc có mùi trong xe, khách hàng vui
                  lòng vệ sinh xe sạch sẽ hoặc gửi phụ thu phí vệ sinh xe.
                </li>
              </ul>
              <span>
                Trân trọng cảm ơn, chúc quý khách hàng có những chuyến đi tuyệt
                vời !{' '}
              </span>
            </div>
          </div>

          <div className="my-6 h-[1px] w-full bg-gray-300" />

          {/* chu xe */}
          <div className="" id="chu-xe">
            <div className="">
              <h3 className="mb-4 text-xl font-medium">Chủ xe</h3>

              {/* info chu xe */}
              <div className="flex items-center justify-start gap-3">
                {car?.owner && (
                  <>
                    <UserInfoAlertDialog
                      userId={car?.owner?.id}
                      avatarUrl={car?.owner?.avatarUrl}
                    />

                    <div className="flex flex-col items-start justify-center">
                      <h4 className="text-2xl font-bold">{car?.owner?.name}</h4>
                    </div>
                  </>
                )}
              </div>

              {/* danh gia */}
              {car?.reviews?.meta?.totalReviews === 0 ? (
                <div className="flex w-full flex-col items-center justify-between">
                  <Image
                    src="/images/empty-review.svg"
                    alt="empty-review"
                    width={340}
                    height={340}
                  />

                  <div className="flex flex-col items-center justify-center gap-2">
                    <p className="text-xl font-medium">Chưa có đánh giá</p>
                    <p className="text-gray-500">
                      Hãy là người đầu tiên đánh giá chủ xe
                    </p>
                  </div>
                </div>
              ) : (
                <div className="mt-4">
                  <div className="flex items-center justify-start gap-2">
                    <span className="flex items-center justify-start gap-1">
                      <Image
                        src="/icons/star-rating-icon.svg"
                        alt=""
                        width={16}
                        height={17}
                      />
                      <p>{car?.reviews?.meta?.average}</p>
                    </span>

                    <div className="h-1 w-1 rounded-full bg-black" />

                    <span className="text-gray-700">
                      {car?.reviews?.meta?.totalReviews} đánh giá
                    </span>
                  </div>

                  {/* review */}
                  <div className="mt-4">
                    {car?.reviews?.data.map((review: any, index: number) => (
                      <div
                        className="mt-4 flex items-center justify-between rounded-lg border border-gray-300 px-8 py-6"
                        key={index}
                      >
                        <div className="flex items-center justify-start gap-3">
                          <Avatar className="h-20 w-20">
                            <AvatarImage
                              src={review.user.avatarUrl}
                              alt="avatar"
                            />
                            <AvatarFallback>Avatar</AvatarFallback>
                          </Avatar>

                          <div className="flex flex-col items-start justify-center">
                            <h4 className="text-2xl font-bold">
                              {review.user.name}
                            </h4>
                            <span className="flex items-center justify-center gap-1">
                              <StarRating rating={review?.rating} />
                            </span>
                          </div>
                        </div>

                        <div className="">
                          {formatDateToDMY(review?.createdAt)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* tinh tien */}
        <div className="w-1/3">
          {/* gia tien */}
          <div className="flex flex-col items-start justify-between gap-3 rounded-lg bg-sky-100/50 p-8">
            {/* header */}
            <div className="flex items-center justify-start gap-2">
              <h3 className="text-2xl font-bold">
                {formatCurrency(car?.pricePerDay)}/ngày
              </h3>
              <HoverCardCustom content="Giá thuê xe được tính theo ngày, thời gian thuê ít hơn 24 tiếng sẽ được tính tròn 1 ngày. Giá thuê xe không bao gồm tiền xăng. Khi kết thúc chuyến đi, bạn vui lòng đổ xăng về lại mức ban đầu như khi nhận xe" />
            </div>

            {/* thoi gian thue */}
            <Dialog>
              <DialogTrigger asChild>
                <div className="flex w-full cursor-pointer items-center justify-between gap-3 rounded-xl border border-primary bg-white p-4">
                  {/* nhan xe */}
                  <div className="">
                    <span className="flex flex-col items-start justify-between gap-1 text-gray-700">
                      Nhận xe
                    </span>
                    {date?.from && (
                      <span className="font-medium">
                        {formatDateToDMY(date?.from)}
                      </span>
                    )}
                  </div>

                  <div className="h-12 w-[1px] bg-primary" />

                  {/* tra xe */}
                  <div className="">
                    <span className="flex flex-col items-start justify-between gap-1 text-gray-700">
                      Trả xe
                    </span>
                    {date?.to && (
                      <span className="font-medium">
                        {formatDateToDMY(date?.to)}
                      </span>
                    )}
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="w-auto">
                <DialogHeader>
                  <DialogTitle>Thời gian</DialogTitle>
                </DialogHeader>
                <div className="">
                  <Calendar
                    initialFocus
                    mode="range"
                    max={30}
                    defaultMonth={date?.from}
                    selected={date}
                    onSelect={setDate}
                    numberOfMonths={2}
                  />
                </div>
                <DialogFooter className="border-t-2 border-gray-200 py-3">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col items-start justify-center">
                      <div className="flex items-center justify-center gap-2 font-medium">
                        {date?.from && date?.to && (
                          <span>
                            {formatDateToDMY(date?.from)} -{' '}
                            {formatDateToDMY(date?.to)}
                          </span>
                        )}
                      </div>
                      {date?.from && date?.to && (
                        <span className="text-md flex items-center justify-center gap-1 text-gray-700">
                          Số ngày thuê:{' '}
                          <p className="font-bold">
                            {countDays(date?.from, date?.to)}
                          </p>{' '}
                          ngày
                        </span>
                      )}
                    </div>

                    <DialogClose asChild>
                      <Button
                        type="submit"
                        className=""
                        onClick={() => handleDate(date?.from, date?.to)}
                      >
                        Xác nhận
                      </Button>
                    </DialogClose>
                  </div>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* dia diem nhan xe */}
            <div className="flex w-full flex-col items-start justify-between gap-2 rounded-xl border border-primary bg-white p-4">
              <h5 className="text-sm text-gray-700">Địa điểm giao xe</h5>
              <span className="font-bold">{car?.address}</span>
              <span className="text-xs text-gray-500 ">
                *Chủ xe không hỗ trợ giao xe tận nơi
              </span>
            </div>

            <div className="my-4 h-[1px] w-full bg-gray-400" />

            {/* tong tien */}
            <div className="w-full">
              <div className="flex w-full items-center justify-between">
                <h5 className="">Tổng cộng</h5>
                <span className="font-bold">
                  {formatCurrency(car?.pricePerDay)} x{' '}
                  {countDays(date?.from, date?.to)} ngày
                </span>
              </div>
            </div>

            {/* thanh tien */}
            <div className="w-full">
              <div className="flex w-full items-center justify-between">
                <h5 className="font-bold">Thành tiền</h5>
                <span className="font-bold">
                  {formatCurrency(
                    car?.pricePerDay * countDays(date?.from, date?.to),
                  )}
                </span>
              </div>
            </div>
            <Button
              className="w-full"
              size="lg"
              onClick={() =>
                handleRentCar(
                  car,
                  date?.from,
                  date?.to,
                  car?.pricePerDay * countDays(date?.from, date?.to),
                )
              }
              isLoading={isLoading}
            >
              Chọn thuê
            </Button>
          </div>

          {/*  Phụ phí có thể phát sinh  */}
          <div className="mt-6 w-full rounded-lg border border-gray-300 p-3">
            <h5 className="mb-3 font-semibold text-primary">
              Phụ phí có thể phát sinh
            </h5>

            <div className="w-full">
              {surcharges.map((surcharge, index) => (
                <div
                  className="mb-2 flex items-start justify-start gap-2 text-xs"
                  key={index}
                >
                  <AlertCircle size={14} className="text-gray-500" />
                  <div className="w-full">
                    <div className="flex items-center justify-between font-bold">
                      <span>{surcharge.name}</span>
                      <span>{surcharge.price}</span>
                    </div>
                    <p className="text-gray-500">{surcharge.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarPage;
