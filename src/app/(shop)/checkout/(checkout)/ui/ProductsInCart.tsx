'use client';

import { useEffect, useState } from 'react';

import { ProductImage } from '@/components';

import { useCartStore } from '@/store';

import { currencyFormat } from '@/utils';

export const ProductsInCart = () => {
  const productsInCart = useCartStore((state) => state.cart);

  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) return <p>Loading...</p>;

  return (
    <>
      {productsInCart.map((product) => (
        <div className='flex mb-5' key={`${product.slug}-${product.size}`}>
          <ProductImage
            className='mr-5 rounded'
            style={{ width: '100px', height: '100px' }}
            src={product.image}
            alt={product.title}
            title={product.title}
            width={100}
            height={100}
          />

          <div>
            <span>
              {product.size} - {product.title} ({product.quantity})
            </span>
            <p className='font-bold'>
              {currencyFormat(product.price * product.quantity)}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};
