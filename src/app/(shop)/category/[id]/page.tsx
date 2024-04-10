import { ProductGrid, Title } from '@/components';

import { initialData } from '@/seed/seed';

import { Category } from '@/interfaces';

const seedProducts = initialData.products;
interface Props {
  params: {
    id: Category;
  };
}

export default function ({ params }: Props) {
  const { id } = params;
  const products = seedProducts.filter((product) => product.gender === id);
  const labels: Record<Category, string> = {
    kid: 'para niños',
    men: 'para hombres',
    unisex: 'para todos',
    women: 'para mujeres',
  };

  return (
    <>
      <Title
        title={`Artículos de ${labels[id]}`}
        subtitle='Todos los productos'
        className='mb-2'
      />
      <ProductGrid products={products} />
    </>
  );
}
