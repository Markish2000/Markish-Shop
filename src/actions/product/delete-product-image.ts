'use server';

import { revalidatePath } from 'next/cache';

import { v2 as cloudinary } from 'cloudinary';

import prisma from '@/libs/prisma';

cloudinary.config(process.env.CLOUDINARY_URL ?? '');

export const deleteProductImage = async (id: number, imageUrl: string) => {
  if (imageUrl.startsWith('http')) {
    const imageName = imageUrl.split('/').pop()?.split('.')[0] ?? '';

    try {
      await cloudinary.uploader.destroy(imageName);
      const deletedImage = await prisma.productImage.delete({
        where: { id },
        select: {
          product: {
            select: {
              slug: true,
            },
          },
        },
      });

      revalidatePath(`/admin/products`);
      revalidatePath(`/admin/product/${deletedImage.product.slug}`);
      revalidatePath(`/product/${deletedImage.product.slug}`);
    } catch (error) {
      console.log(error);

      const message = 'No se pudo eliminar la imagen';
      return { ok: false, message };
    }
  }

  const error = 'No se pueden borrar imágenes de FS.';
  return { ok: false, error };
};
