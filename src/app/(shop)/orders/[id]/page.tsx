import { redirect } from 'next/navigation';
import Image from 'next/image';

import { IoCardOutline } from 'react-icons/io5';
import clsx from 'clsx';

import { PaypalButton, Title } from '@/components';

import { getOrderById } from '@/actions';

import { currencyFormat } from '@/utils';

interface Props {
  params: {
    id: string;
  };
}

export default async function OrdersByIdPage({ params }: Readonly<Props>) {
  const { id } = params;
  const { ok, order } = await getOrderById(id);

  if (!ok) redirect('/');

  const address = order?.OrderAddress;

  return (
    <div className='flex justify-center items-center mb-72 px-10 sm:px-0'>
      <div className='flex flex-col w-[1000px]'>
        <Title title={`Orden #${id.split('-').at(-1)}`} />

        <div className='grid grid-col-1 sm:grid-cols-2 gap-10'>
          <div className='flex flex-col mt-5'>
            <div
              className={clsx(
                'flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5',
                {
                  'bg-red-500': !order?.isPaid,
                  'bg-green-700': order?.isPaid,
                }
              )}
            >
              <IoCardOutline size={30} />
              <span className='mx-2'>
                {order?.isPaid ? 'Está pagada.' : 'No está pagada.'}
              </span>
            </div>
            {order?.OrderItem.map((item) => (
              <div
                className='flex mb-5'
                key={`${item.product.slug}-${item.size}`}
              >
                <Image
                  className='mr-5 rounded'
                  style={{ width: '100px', height: '100px' }}
                  src={`/products/${item.product.ProductImage[0].url}`}
                  alt={item.product.title}
                  title={item.product.title}
                  width={100}
                  height={100}
                />

                <div>
                  <p>{item.product.title}</p>
                  <p>
                    {currencyFormat(item.price)} x {item.quantity}
                  </p>
                  <p className='font-bold'>
                    Subtotal: {currencyFormat(item.price * item.quantity)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className='bg-white rounded-xl shadow-xl p-7'>
            <h2 className='text-2xl font-bold mb-2'>Dirección de entrega</h2>

            <div className='mb-10'>
              <p className='text-xl'>
                {address!.firstName} {address!.lastName}
              </p>
              <p>{address!.address}</p>
              <p>{address!.address2}</p>
              <p>{address!.postalCode}</p>
              <p>
                {address!.city}, {address!.countryId}
              </p>
              <p>{address!.phone}</p>
            </div>

            <div className='w-full h-0.5 rounded bg-gray-200 mb-10' />

            <h2 className='text-2xl mb-2'>Resumen de orden</h2>

            <div className='grid grid-cols-2'>
              <span>No. Productos</span>
              <span className='text-right'>
                {order?.itemsInOrder === 1
                  ? 'Un artículo'
                  : `${order?.itemsInOrder} artículos`}
              </span>

              <span>Subtotal:</span>
              <span className='text-right'>
                {currencyFormat(order!.subTotal)}
              </span>

              <span>Impuestos (15%)</span>
              <span className='text-right'>{currencyFormat(order!.tax)}</span>

              <span className='text-2xl mt-5'>Total:</span>
              <span className='text-right text-2xl mt-5'>
                {currencyFormat(order!.total)}
              </span>
            </div>

            <PaypalButton amount={order!.total} orderId={order!.id} />
          </div>
        </div>
      </div>
    </div>
  );
}
