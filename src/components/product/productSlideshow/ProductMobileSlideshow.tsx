'use client';

import { Autoplay, FreeMode, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { ProductImage } from '@/components';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import './productSlideshow.css';

interface Props {
  images: string[];
  title: string;
  className?: string;
}

export const ProductMobileSlideshow = ({ images, title, className }: Props) => {
  return (
    <div className={className}>
      <Swiper
        style={{
          width: '100vw',
          height: '500px',
        }}
        pagination
        autoplay={{ delay: 2500 }}
        modules={[FreeMode, Autoplay, Pagination]}
        className='mySwiper2'
      >
        {images.map((image) => (
          <SwiperSlide key={image}>
            <ProductImage
              className='object-fill'
              src={image}
              alt={title}
              title={title}
              width={600}
              height={500}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
