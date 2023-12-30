'use client';

import React, { useEffect, useState } from 'react';

import { GET_NEWEST_CARS } from '@/lib/api-constants';
import { API } from '@/services';

import CarCard from '../CarCard';

const FeaturedCar = () => {
  const [newestCar, setNewestCar] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getNewestCar = async () => {
    setIsLoading(true);
    try {
      const response = await API.get(GET_NEWEST_CARS);
      setNewestCar(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect((): void => {
    getNewestCar();
  }, []);

  return (
    <section className="mt-32 flex w-full justify-center">
      <div className="text-center">
        <h2 className="mb-6 text-4xl font-bold">Xe dành cho bạn</h2>

        <div className="grid grid-cols-4 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {newestCar && (
            <>
              {newestCar.map((car: any, index) => (
                <div className="col-span-1" key={index}>
                  <CarCard {...car} />
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCar;
