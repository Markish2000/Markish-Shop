export const revalidate = 0;

import Link from 'next/link';

import { Pagination, ProductImage, Title } from '@/components';

import { getPaginatedProductsWithImages } from '@/actions';

import { currencyFormat } from '../../../../utils/currencyFormat';

interface Props {
  searchParams: {
    page?: string;
  };
}

export default async function OrdersPage({ searchParams }: Readonly<Props>) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const { products, currentPage, totalPages } =
    await getPaginatedProductsWithImages({ page });

  return (
    <>
      <Title title='Mantenimientos de productos' />
      <div className='flex justify-end mb-5'>
        <Link className='btn-primary' href='/admin/product/new'>
          Nuevo producto
        </Link>
      </div>
      <div className='mb-10'>
        <table className='min-w-full'>
          <thead className='bg-gray-200 border-b'>
            <tr>
              <th
                className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
                scope='col'
              >
                Imagen
              </th>
              <th
                className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
                scope='col'
              >
                Título
              </th>
              <th
                className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
                scope='col'
              >
                Precio
              </th>
              <th
                className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
                scope='col'
              >
                Genero
              </th>
              <th
                className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
                scope='col'
              >
                Inventario
              </th>
              <th
                className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
                scope='col'
              >
                Tallas
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                className='bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100'
                key={product.id}
              >
                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                  <Link href={`/product/${product.slug}`}>
                    <ProductImage
                      className='w-20 h-20 object-cover rounded'
                      src={product.ProductImage[0]?.url}
                      width={80}
                      height={80}
                      alt={product.title}
                      title={product.title}
                    />
                  </Link>
                </td>
                <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                  <Link
                    className='hover:underline'
                    href={`/admin/product/${product.slug}`}
                  >
                    {product.title}
                  </Link>
                </td>
                <td className='text-sm font-bold text-gray-900 px-6 py-4 whitespace-nowrap'>
                  {currencyFormat(product.price)}
                </td>
                <td className='text-sm font-light text-gray-900 px-6 py-4 whitespace-nowrap'>
                  {product.gender}
                </td>
                <td className='text-sm font-light text-gray-900 px-6 py-4 whitespace-nowrap'>
                  {product.inStock}
                </td>
                <td className='text-sm font-bold text-gray-900 px-6 py-4 whitespace-nowrap'>
                  {product.sizes.join(', ')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Pagination totalPages={totalPages} />
      </div>
    </>
  );
}
