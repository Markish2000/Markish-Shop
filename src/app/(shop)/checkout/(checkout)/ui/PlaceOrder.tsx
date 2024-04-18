'use client';

import { useEffect, useState } from 'react';

import clsx from 'clsx';

import { useAddressStore, useCartStore } from '@/store';

import { currencyFormat } from '@/utils';

export const PlaceOrder = () => {
  const [loaded, setLoaded] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const address = useAddressStore((state) => state.address);

  const { itemsInCart, subTotal, tax, total } = useCartStore((state) =>
    state.getSummaryInformation()
  );

  const cart = useCartStore((state) => state.cart);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const onPlaceOrder = async () => {
    setIsPlacingOrder(true);

    const productsToOrder = cart.map((product) => ({
      productId: product.id,
      quantity: product.quantity,
      size: product.size,
    }));
    setIsPlacingOrder(false);
  };

  if (!loaded) return <p>Cargando...</p>;

  return (
    <div className='bg-white rounded-xl shadow-xl p-7'>
      <h2 className='text-2xl font-bold mb-2'>Dirección de entrega</h2>

      <div className='mb-10'>
        <p className='text-xl'>
          {address.firstName} {address.lastName}
        </p>
        <p>{address.address}</p>
        <p>{address.address2}</p>
        <p>{address.postalCode}</p>
        <p>
          {address.city}, {address.country}
        </p>
        <p>{address.phone}</p>
      </div>

      <div className='w-full h-0.5 rounded bg-gray-200 mb-10' />

      <h2 className='text-2xl mb-2'>Resumen de orden</h2>

      <div className='grid grid-cols-2'>
        <span>No. Productos</span>
        <span className='text-right'>
          {itemsInCart === 1 ? 'Un artículo' : `${itemsInCart} artículos`}
        </span>

        <span>Subtotal:</span>
        <span className='text-right'>{currencyFormat(subTotal)}</span>

        <span>Impuestos (15%)</span>
        <span className='text-right'>{currencyFormat(tax)}</span>

        <span className='text-2xl mt-5'>Total:</span>
        <span className='text-right text-2xl mt-5'>
          {currencyFormat(total)}
        </span>
      </div>

      <div className='mt-5 mb-2 w-full'>
        <p className='mb-5'>
          <span className='text-xs'>
            Al hacer click en &quot;Ordenar&quot;, aceptas nuestros{' '}
            <a className='underline' href='#'>
              términos y condiciones{' '}
            </a>
            y{' '}
            <a className='underline' href='#'>
              política de privacidad
            </a>
            .
          </span>
        </p>

        <p className='text-red-500'>Error de creación</p>

        <button
          className={clsx({
            'btn-primary': !isPlacingOrder,
            'btn-disabled': isPlacingOrder,
          })}
          onClick={onPlaceOrder}
        >
          Ordenar
        </button>
      </div>
    </div>
  );
};
