'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import Advantage from '@/components/home/Advantage';
import CarRentalInstructions from '@/components/home/CarRentalInstructions';
import Explorer from '@/components/home/Explorer';
import FeaturedCar from '@/components/home/FeaturedCar';
import SearchBox from '@/components/home/SearchBox';

const bannerImgList: string[] = [
  '/images/banner-img1.png',
  '/images/banner-img2.png',
  '/images/banner-img3.png',
  '/images/banner-img4.png',
];

const HomePage = () => {
  const [bannerImg, setBannerImg] = useState<string>(bannerImgList[0]);
  useEffect(() => {
    const interval = setInterval(() => {
      setBannerImg(
        bannerImgList[Math.floor(Math.random() * bannerImgList.length)],
      );
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="">
      {/* Banner */}
      <div className="relative flex h-auto max-h-[600px] w-auto items-center justify-center overflow-hidden rounded-xl bg-transparent">
        <Image
          src={bannerImg}
          width={1280}
          height={600}
          alt="banner-img"
          style={{ objectFit: 'cover' }}
        />
        <div className="absolute flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold text-white">
            Trãi nghiệm thuê xe cùng{' '}
            <span className="text-primary">Rental Cars</span>
          </h1>
          <div className="my-4 h-[1px] w-3/5 bg-white" />
          <p className="text-lg text-white">
            Nền tảng cho thuê xe ô tô tại Đà Nẵng
          </p>
        </div>
      </div>

      <div className="relative">
        <SearchBox />
      </div>

      <FeaturedCar />

      <Advantage />

      <CarRentalInstructions />

      <Explorer />
    </div>
  );
};

export default HomePage;
