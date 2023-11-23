'use client';

import { CalendarDays } from 'lucide-react';
import React, { useEffect, useState } from 'react';

import CarCard from '@/components/CarCard';
import FilterDialog from '@/components/FilterDialog';
import { formatDate } from '@/lib/utils';

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

const carList2 = [
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

const SearchPage = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array ensures that the effect runs only once on mount

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        fetchData();
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [data]);

  const fetchData = async () => {
    try {
      const newData = carList2;
      setData((prevData) => [...prevData, ...newData]); // Concatenate old data with new data
      setPage((prevPage) => prevPage + 1); // Increment page number for the next request
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="mt-6">
      <header className="sticky top-0 z-30 rounded-lg bg-white px-6 py-6 shadow-xl">
        <div className="text-center">
          <span>
            <CalendarDays size={24} className="mr-4 inline-block" />
            {formatDate(searchParams.startDate as string)}
            {' - '}
            {formatDate(searchParams.endDate as string)}
          </span>
        </div>

        <div className="">
          <FilterDialog />
        </div>
      </header>

      <div className="mt-6 grid grid-cols-4 gap-6">
        {carList.map((car, index) => (
          <div className="col-span-1" key={index}>
            <CarCard {...car} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
