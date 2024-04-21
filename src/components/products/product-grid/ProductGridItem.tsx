'use client';

import { useState } from 'react';

import Link from 'next/link';

import { ProductImage } from '@/components';

import { Product } from '@/interfaces';

interface Props {
  product: Product;
}

export const ProductGridItem = ({ product }: Props) => {
  const [displayImage, setDisplayImage] = useState<string>(product.images[0]);

  return (
    <div className='rounded-md overflow-hidden fade-in'>
      <Link href={`/product/${product.slug}`}>
        <ProductImage
          className='w-full object-cover'
          src={displayImage}
          alt={product.title}
          title={product.title}
          width={500}
          height={500}
          onMouseEnter={() => setDisplayImage(product.images[1])}
          onMouseLeave={() => setDisplayImage(product.images[0])}
        />
      </Link>

      <div className='p-4 flex flex-col'>
        <Link className='hover:text-blue-600' href={`/product/${product.slug}`}>
          {product.title}
        </Link>
        <span className='font-bold'>${product.price}</span>
      </div>
    </div>
  );
};
