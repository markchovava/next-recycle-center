"use client"
import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { FaCircleChevronLeft, FaCircleChevronRight } from "react-icons/fa6";
import type { Swiper as SwiperType } from 'swiper';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Link from 'next/link';
import { CenterData } from '@/_data/sample/CenterData';
import CardCenter from '../cards/CardCenter';


export default function CarouselPrimary() {
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  

  const handleSlideChange = (swiper: SwiperType): void => {
    setActiveIndex(swiper.realIndex);
  };

  // Handle direct pagination click with React components
  const handlePaginationClick = (index: number): void => {
    if (swiperInstance) {
      swiperInstance.slideToLoop(index);
    }
  };

  useEffect(() => {
    // This code will only run on the client-side
    setWindowWidth(window.innerWidth);
    
    const handleResize = (): void => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); 

  return (
    <div className="w-full mx-auto">
      <Swiper
        onSwiper={(swiper) => {
          setSwiperInstance(swiper);
        }}
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={4}
        loop={true}
        breakpoints={{
          320: { slidesPerView: 2 },
          640: { slidesPerView: 4 },
          1024: { slidesPerView: 4 },
        }}
        onSlideChange={handleSlideChange}
        navigation={false}
        pagination={false}
        className="mb-6"
      >
        {/* slides */}
        {CenterData.map((i, key) => (
          <SwiperSlide key={key} className='p-2'>
            <CardCenter dbData={i} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation buttons */}
      <div className="navigation-buttons flex items-center justify-end gap-4 px-2">
        <button 
          onClick={() => {
            if (swiperInstance) {
              swiperInstance.slidePrev();
            }
          }} 
          className="group cursor-pointer carousel-button-prev p-2 rounded-full drop-shadow-lg bg-white hover:bg-gray-50 focus:outline-none transition-colors"
          aria-label="Previous slide"
          disabled={!swiperInstance}
        >
          <FaCircleChevronLeft className="w-6 h-6 text-green-800 transition-all ease-linear duration-100 group-hover:scale-105" />
        </button>
        <button 
          onClick={() => {
            if (swiperInstance) {
              swiperInstance.slideNext();
            }
          }} 
          className="group cursor-pointer carousel-button-next p-2 rounded-full drop-shadow-lg bg-white hover:bg-gray-50 focus:outline-none transition-colors"
          aria-label="Next slide"
          disabled={!swiperInstance}
        >
          <FaCircleChevronRight className="w-6 h-6 text-green-800 transition-all ease-linear duration-100 group-hover:scale-105" />
        </button>
      </div>
    </div>
  );
}