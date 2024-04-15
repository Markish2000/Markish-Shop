import Image from 'next/image';

import { IoCardOutline } from 'react-icons/io5';
import clsx from 'clsx';

import { Title } from '@/components';

import { initialData } from '@/seed/seed';

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

interface Props {
  params: {
    id: string;
  };
}

export default function OrdersByIdPage({ params }: Props) {
  const { id } = params;

  return (
    <div className='flex justify-center items-center mb-72 px-10 sm:px-0'>
      <div className='flex flex-col w-[1000px]'>
        <Title title={`Orden #${id}`} />

        <div className='grid grid-col-1 sm:grid-cols-2 gap-10'>
          <div className='flex flex-col mt-5'>
            <div
              className={clsx(
                'flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5',
                { 'bg-red-500': false, 'bg-green-700': true }
              )}
            >
              <IoCardOutline size={30} />
              {/* <span className='mx-2'>Pendiente de pago</span> */}
              <span className='mx-2'>Pagada</span>
            </div>
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
                  <p>${product.price} x 3</p>
                  <p className='font-bold'>Subtotal: ${product.price * 3}</p>
                </div>
              </div>
            ))}
          </div>

          <div className='bg-white rounded-xl shadow-xl p-7'>
            <h2 className='text-2xl font-bold mb-2'>Dirección de entrega</h2>

            <div className='mb-10'>
              <p className='text-xl'>Marcos Parella</p>
              <p>Calle falsa 123</p>
              <p>Av. Sarmiento</p>
              <p>Tigre</p>
              <p>Buenos Aires</p>
              <p>CP 1598</p>
              <p>1151515151</p>
            </div>

            <div className='w-full h-0.5 rounded bg-gray-200 mb-10' />

            <h2 className='text-2xl mb-2'>Resumen de orden</h2>

            <div className='grid grid-cols-2'>
              <span>Nr. Productos</span>
              <span className='text-right'>3 productos</span>
              <span>Subtotal:</span>
              <span className='text-right'>$100</span>
              <span>Impuestos (15%)</span>
              <span className='text-right'>$100</span>
              <span className='text-2xl mt-5'>Total:</span>
              <span className='text-right text-2xl mt-5'>$100</span>
            </div>

            <div className='mt-5 mb-2 w-full'>
              <div
                className={clsx(
                  'flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5',
                  { 'bg-red-500': false, 'bg-green-700': true }
                )}
              >
                <IoCardOutline size={30} />
                {/* <span className='mx-2'>Pendiente de pago</span> */}
                <span className='mx-2'>Pagada</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
