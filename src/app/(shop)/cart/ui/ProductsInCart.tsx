'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';

import { ProductImage, QuantitySelector } from '@/components';

import { useCartStore } from '@/store';

export const ProductsInCart = () => {
  const updateProductQuantity = useCartStore(
    (state) => state.updateProductQuantity
  );
  const removeProduct = useCartStore((state) => state.removeProduct);
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
            <Link
              className='hover:underline cursor-pointer'
              href={`/product/${product.slug}`}
            >
              {product.size} - {product.title}
            </Link>
            <p>${product.price}</p>
            <QuantitySelector
              quantity={product.quantity}
              onQuantityChanged={(quantity) =>
                updateProductQuantity(product, quantity)
              }
            />
            <button
              className='underline mt-3'
              onClick={() => removeProduct(product)}
            >
              Remover
            </button>
          </div>
        </div>
      ))}
    </>
  );
};
