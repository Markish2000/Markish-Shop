'use server';

import prisma from '@/libs/prisma';

export const getProductBySlug = async (slug: string) => {
  try {
    const product = await prisma.product.findFirst({
      include: { ProductImage: true },
      where: { slug },
    });

    if (product) {
      return {
        ...product,
        images: product.ProductImage.map((image) => image.url),
      };
    }

    return null;
  } catch (error) {
    console.log(error);
    throw new Error('Error al obtener el producto por slug.');
  }
};
