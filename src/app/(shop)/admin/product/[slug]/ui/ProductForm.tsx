'use client';

import { useRouter } from 'next/navigation';

import { useForm } from 'react-hook-form';
import clsx from 'clsx';

import { ProductImage } from '@/components';

import {
  Category,
  Product,
  ProductImage as ProductImageInterface,
} from '@/interfaces';

import { createUpdateProduct } from '@/actions';

interface Props {
  product: Partial<Product> & { ProductImage?: ProductImageInterface[] };
  categories: Category[];
}

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

interface FormInputs {
  categoryId: string;
  description: string;
  gender: 'men' | 'women' | 'kid' | 'unisex';
  images?: FileList;
  inStock: number;
  price: number;
  sizes: string[];
  slug: string;
  tags: string;
  title: string;
}

export const ProductForm = ({ product, categories }: Props) => {
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { isValid },
    getValues,
    setValue,
    watch,
  } = useForm<FormInputs>({
    defaultValues: {
      ...product,
      tags: product.tags?.join(', '),
      sizes: product.sizes ?? [],
      images: undefined,
    },
  });

  watch('sizes');

  const onSizeChanged = (size: string) => {
    const sizes = new Set(getValues('sizes'));

    sizes.has(size) ? sizes.delete(size) : sizes.add(size);

    setValue('sizes', Array.from(sizes));
  };

  const onSubmit = async (data: FormInputs) => {
    const formData = new FormData();
    const { images, ...productToSave } = data;

    if (product.id) formData.append('id', product.id ?? '');
    formData.append('title', productToSave.title);
    formData.append('slug', productToSave.slug);
    formData.append('description', productToSave.description);
    formData.append('price', productToSave.price.toString());
    formData.append('inStock', productToSave.inStock.toString());
    formData.append('sizes', productToSave.sizes.toString());
    formData.append('tags', productToSave.tags);
    formData.append('categoryId', productToSave.categoryId);
    formData.append('gender', productToSave.gender);

    if (images) {
      for (let i = 0; i < images.length; i++) {
        const file = images.item(i);

        if (file) formData.append('images', file);
      }
    }

    const { ok, product: updatedProduct } = await createUpdateProduct(formData);

    if (!ok) {
      const messageAlert = 'El producto no se pudo actualizar.';
      alert(messageAlert);

      return;
    }

    router.replace(`/admin/product/${updatedProduct?.slug}`);
  };

  return (
    <form
      className='grid px-5 mb-16 grid-cols-1 sm:px-0 sm:grid-cols-2 gap-3'
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className='w-full'>
        <div className='flex flex-col mb-2'>
          <span>Título</span>
          <input
            className='p-2 border rounded-md bg-gray-200'
            type='text'
            {...(register('title'), { required: true })}
          />
        </div>

        <div className='flex flex-col mb-2'>
          <span>Slug</span>
          <input
            className='p-2 border rounded-md bg-gray-200'
            type='text'
            {...(register('slug'), { required: true })}
          />
        </div>

        <div className='flex flex-col mb-2'>
          <span>Descripción</span>
          <textarea
            className='p-2 border rounded-md bg-gray-200'
            rows={5}
            {...(register('description'), { required: true })}
          ></textarea>
        </div>

        <div className='flex flex-col mb-2'>
          <span>Price</span>
          <input
            className='p-2 border rounded-md bg-gray-200'
            type='number'
            {...(register('price'), { required: true, min: 0 })}
          />
        </div>

        <div className='flex flex-col mb-2'>
          <span>Tags</span>
          <input
            className='p-2 border rounded-md bg-gray-200'
            type='text'
            {...(register('tags'), { required: true })}
          />
        </div>

        <div className='flex flex-col mb-2'>
          <span>Gender</span>
          <select
            className='p-2 border rounded-md bg-gray-200'
            {...(register('gender'), { required: true })}
          >
            <option value=''>[Seleccione]</option>
            <option value='men'>Men</option>
            <option value='women'>Women</option>
            <option value='kid'>Kid</option>
            <option value='unisex'>Unisex</option>
          </select>
        </div>

        <div className='flex flex-col mb-2'>
          <span>Categoría</span>
          <select
            className='p-2 border rounded-md bg-gray-200'
            {...(register('categoryId'), { required: true })}
          >
            <option value=''>[Seleccione]</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <button className='btn-primary w-full'>Guardar</button>
      </div>

      <div className='w-full'>
        <div className='flex flex-col mb-2'>
          <span>Inventario</span>
          <input
            className='p-2 border rounded-md bg-gray-200'
            type='number'
            {...(register('inStock'), { required: true, min: 0 })}
          />
        </div>
        <div className='flex flex-col'>
          <span>Tallas</span>
          <div className='flex flex-wrap'>
            {sizes.map((size) => (
              <button
                className={clsx(
                  'p-2 border cursor-pointer rounded-md mr-2 mb-2 w-14 transition-all text-center',
                  {
                    'bg-blue-500 text-white': getValues('sizes').includes(size),
                  }
                )}
                onClick={() => onSizeChanged(size)}
                key={size}
              >
                <span>{size}</span>
              </button>
            ))}
          </div>

          <div className='flex flex-col mb-2'>
            <span>Fotos</span>
            <input
              className='p-2 border rounded-md bg-gray-200'
              type='file'
              multiple
              accept='image/png, image/jpeg, image/avif'
              {...register('images')}
            />
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-3 gap-3'>
            {product.ProductImage?.map((image) => (
              <div key={image.id}>
                <ProductImage
                  className='rounded-t shadow-md'
                  src={image.url}
                  width={300}
                  height={300}
                  alt={product.title ?? ''}
                  title={product.title ?? ''}
                />
                <button
                  className='btn-danger w-full rounded-b-xl'
                  type='button'
                  // onClick={}
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </form>
  );
};
