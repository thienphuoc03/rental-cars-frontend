import Image from 'next/image';
import React from 'react';

const advantageList: {
  icon: string;
  statistical: string;
  description: string;
}[] = [
  {
    icon: '/icons/suitcase-icon.svg',
    statistical: '100,000+',
    description: 'Chuyến đi đầy cảm hứng đã đồng hành',
  },
  {
    icon: '/icons/user-icon.svg',
    statistical: '50,000+',
    description: 'Khách hàng đã trải nghiệm dịch vụ',
  },
  {
    icon: '/icons/hat-icon.svg',
    statistical: '5,000+',
    description: 'Đối tác chủ xe trong cộng đồng',
  },
  {
    icon: '/icons/car-icon.svg',
    statistical: '100+',
    description: 'Dòng xe khác nhau đang cho thuê',
  },
  {
    icon: '/icons/star-outline-icon.svg',
    statistical: '4.95/5*',
    description:
      'Là số điểm nhận được từ >50,000 khách hàng đánh giá về dịch vụ của chúng tôi',
  },
];

const AboutPage = () => {
  return (
    <div className="mt-8">
      <div className="flex animate-[slideInFromTop] flex-wrap items-center justify-between gap-3 rounded-xl bg-white px-4 py-8 duration-1000 ease-out">
        <h2 className="max-w-[440px] text-6xl font-medium text-black lg:w-full lg:max-w-full">
          Rental Cars - Cùng bạn đến mọi hành trình
        </h2>
        <div className="max-w-[776px] lg:w-full lg:max-w-full">
          <span className="block text-justify text-lg text-gray-700">
            Mỗi chuyến đi là một hành trình khám phá cuộc sống và thế giới xung
            quanh, là cơ hội học hỏi và chinh phục những điều mới lạ của mỗi cá
            nhân để trở nên tốt hơn. Do đó, chất lượng trải nghiệm của khách
            hàng là ưu tiên hàng đầu và là nguồn cảm hứng của đội ngũ MIOTO.
          </span>
          <span className="mt-4 block text-justify text-lg text-gray-700">
            Rental Cars là nền tảng chia sẻ ô tô, sứ mệnh của chúng tôi không
            chỉ dừng lại ở việc kết nối chủ xe và khách hàng một cách Nhanh
            chóng - An toàn - Tiện lợi, mà còn hướng đến việc truyền cảm hứng
            KHÁM PHÁ những điều mới lạ đến cộng đồng qua những chuyến đi trên
            nền tảng của chúng tôi.
          </span>
        </div>
      </div>

      <Image
        src={'/images/banner-about.png'}
        alt=""
        width={1280}
        height={519}
        className="animation-[slideInFromLeft] mt-10 duration-1000 ease-out"
      />

      <div className="mt-10 text-center">
        <h3 className="mb-6 text-4xl font-semibold">
          Rental Cars và những con số
        </h3>
        <ul className="grid grid-cols-3 gap-4 md:grid-cols-2">
          {advantageList.map(({ icon, statistical, description }, index) => (
            <li
              key={index}
              className="col-span-1 flex max-w-[426px] flex-col items-center justify-start gap-2 px-3"
            >
              <Image src={icon} alt={icon} width={60} height={61} />
              <span className="text-xl font-semibold">{statistical}</span>
              <span className="px-8">{description}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AboutPage;
