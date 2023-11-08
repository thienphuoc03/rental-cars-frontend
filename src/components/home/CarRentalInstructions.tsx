import Image from 'next/image';
import React from 'react';

const carRentalInstructionsList: { image: string; title: string }[] = [
  {
    image: '/images/dat-xe-tren-web.svg',
    title: 'Đặt xe trên web Rental Cars',
  },
  {
    image: '/images/nhan-xe.svg',
    title: 'Nhận xe',
  },
  {
    image: '/images/bat-dau-hanh-trinh.svg',
    title: 'Bắt đầu hành trình',
  },
  {
    image: '/images/tra-xe-va-ket-thuc-chuyen-di.svg',
    title: 'Trả xe và kết thúc chuyến đi',
  },
];

const CarRentalInstructions = () => {
  return (
    <section className="mt-20 w-full rounded-lg bg-white py-6">
      <div className="">
        <div className="flex flex-col items-center justify-center gap-6">
          <h2 className="text-4xl font-bold text-black">Hướng dẫn thuê xe</h2>
          <p className="text-lg text-black">
            Chỉ với 4 bước đơn giản để trải nghiệm thuê xe Mioto một cách nhanh
            chóng
          </p>
        </div>
      </div>

      <ul className="mt-6 flex items-start justify-between gap-4 xl:grid xl:grid-cols-2">
        {carRentalInstructionsList.map(({ image, title }, index) => (
          <li
            key={index}
            className="mt-4 flex max-h-[308px] max-w-[313px] flex-col items-center gap-4 text-black "
          >
            <div className="max-h-[200px] max-w-[200px]">
              <Image src={image} alt="title" width={200} height={200} />
            </div>
            <span className="flex min-w-[170px] items-start justify-center gap-3 px-10">
              <p className="text-2xl font-bold text-primary">0{index + 1}</p>
              <p className="min-w-[130px] text-2xl font-bold">{title}</p>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default CarRentalInstructions;
