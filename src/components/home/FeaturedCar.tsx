import React from 'react';

import CarCard from '../CarCard';

const carList = [
  {
    slug: '/xe-oto-1',
    image: '/images/car.jpg',
    name: 'TOYOTA VELOZ CROSS 2022',
    transmission: 'Số tự động',
    address: 'Phường Thanh Bình, Hải Châu, Đà Nẵng',
    price: 500.0,
    trip: 59,
    rating: 4.5,
  },
  {
    slug: '/xe-oto-1',
    image: '/images/car.jpg',
    name: 'TOYOTA VELOZ CROSS 2022',
    transmission: 'Số tự động',
    address: 'Phường Thanh Bình, Hải Châu, Đà Nẵng',
    price: 500.0,
    trip: 59,
    rating: 4.5,
  },
  {
    slug: '/xe-oto-1',
    image: '/images/car.jpg',
    name: 'TOYOTA VELOZ CROSS 2022',
    transmission: 'Số tự động',
    address: 'Phường Thanh Bình, Hải Châu, Đà Nẵng',
    price: 500.0,
    trip: 59,
    rating: 4.5,
  },
  {
    slug: '/xe-oto-1',
    image: '/images/car.jpg',
    name: 'TOYOTA VELOZ CROSS 2022',
    transmission: 'Số tự động',
    address: 'Phường Thanh Bình, Hải Châu, Đà Nẵng',
    price: 500.0,
    trip: 59,
    rating: 4.5,
  },
  {
    slug: '/xe-oto-1',
    image: '/images/car.jpg',
    name: 'TOYOTA VELOZ CROSS 2022',
    transmission: 'Số tự động',
    address: 'Phường Thanh Bình, Hải Châu, Đà Nẵng',
    price: 500.0,
    trip: 59,
    rating: 4.5,
  },
  {
    slug: '/xe-oto-1',
    image: '/images/car.jpg',
    name: 'TOYOTA VELOZ CROSS 2022',
    transmission: 'Số tự động',
    address: 'Phường Thanh Bình, Hải Châu, Đà Nẵng',
    price: 500.0,
    trip: 59,
    rating: 4.5,
  },
  {
    slug: '/xe-oto-1',
    image: '/images/car.jpg',
    name: 'TOYOTA VELOZ CROSS 2022',
    transmission: 'Số tự động',
    address: 'Phường Thanh Bình, Hải Châu, Đà Nẵng',
    price: 500.0,
    trip: 59,
    rating: 4.5,
  },
  {
    slug: '/xe-oto-1',
    image: '/images/car.jpg',
    name: 'TOYOTA VELOZ CROSS 2022',
    transmission: 'Số tự động',
    address: 'Phường Thanh Bình, Hải Châu, Đà Nẵng',
    price: 500.0,
    trip: 59,
    rating: 4.5,
  },
];

const FeaturedCar = () => {
  return (
    <section className="mt-32 flex w-full justify-center">
      <div className="text-center">
        <h2 className="mb-6 text-4xl font-bold">Xe dành cho bạn</h2>

        <div className="grid grid-cols-4 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {carList.map((car, index) => (
            <div className="col-span-1" key={index}>
              <CarCard {...car} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCar;
