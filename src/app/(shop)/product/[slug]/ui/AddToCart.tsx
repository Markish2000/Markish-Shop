'use client';

import { useState } from 'react';

import { QuantitySelector, SizeSelector } from '@/components';

import { useCartStore } from '@/store';

import type { CartProduct, Product, Size } from '@/interfaces';

interface Props {
  product: Product;
}

export const AddToCart = ({ product }: Props) => {
  const addProductToCart = useCartStore((state) => state.addProductToCart);

  const [size, setSize] = useState<Size>();
  const [quantity, setQuantity] = useState<number>(1);
  const [posted, setPosted] = useState<boolean>(false);

  const addToCart = () => {
    setPosted(true);

    if (size) {
      const cartProduct: CartProduct = {
        id: product.id,
        image: product.images[0],
        price: product.price,
        quantity,
        size,
        slug: product.slug,
        title: product.title,
      };

      addProductToCart(cartProduct);
      setPosted(false);
      setSize(undefined);
    }
  };

  return (
    <>
      {posted && !size && (
        <span className='mt-2 text-red-500'>Debe seleccionar una talla*</span>
      )}
      <SizeSelector
        selectedSize={size}
        availableSizes={product.sizes}
        onSizeChanged={setSize}
      />
      <QuantitySelector quantity={quantity} onQuantityChanged={setQuantity} />
      <button className='btn-primary my-5' onClick={addToCart}>
        Agregar al carrito
      </button>
    </>
  );
};
