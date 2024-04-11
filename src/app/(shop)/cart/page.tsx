import { redirect } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

import { QuantitySelector, Title } from '@/components';

import { initialData } from '@/seed/seed';

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

export default function () {
  if (productsInCart.length === 0) redirect('/empty');

  return (
    <div className='flex justify-center items-center mb-72 px-10 sm:px-0'>
      <div className='flex flex-col w-[1000px]'>
        <Title title='Carrito' />

        <div className='grid grid-col-1 sm:grid-cols-2 gap-10'>
          <div className='flex flex-col mt-5'>
            <span className='text-xl'>Agregar más items</span>
            <Link className='underline mb-5' href='/'>
              Continúa comprando
            </Link>
            {productsInCart.map((product) => (
              <div className='flex mb-5' key={product.slug}>
                <Image
                  className='mr-5 rounded'
                  style={{ width: '100px', height: '100px' }}
                  src={`/products/${product.images[0]}`}
                  alt={product.title}
                  title={product.title}
                  width={100}
                  height={100}
                />

                <div>
                  <p>{product.title}</p>
                  <p>${product.price}</p>
                  <QuantitySelector quantity={3} />
                  <button className='underline mt-3'>Remover</button>
                </div>
              </div>
            ))}
          </div>

          <div className='bg-white rounded-xl shadow-xl p-7 h-fit'>
            <h2 className='text-2xl mb-2'>Resumen de orden</h2>

            <div className='grid grid-cols-2'>
              <span>No. Productos</span>
              <span className='text-right'>3 productos</span>
              <span>Subtotal:</span>
              <span className='text-right'>$100</span>
              <span>Impuestos (15%)</span>
              <span className='text-right'>$100</span>
              <span className='text-2xl mt-5'>Total:</span>
              <span className='text-right text-2xl mt-5'>$100</span>
            </div>

            <div className='mt-5 mb-2 w-full'>
              <Link
                className='flex btn-primary justify-center'
                href='/checkout/address'
              >
                Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}