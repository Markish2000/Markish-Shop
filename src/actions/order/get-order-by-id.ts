'use server';

import { auth } from '@/auth.config';

import prisma from '@/libs/prisma';

export const getOrderById = async (id: string) => {
  try {
    const session = await auth();

    if (session?.user) {
      const order = await prisma.order.findUnique({
        where: { id },
        include: {
          OrderAddress: true,
          OrderItem: {
            select: {
              price: true,
              quantity: true,
              size: true,
              product: {
                select: {
                  title: true,
                  slug: true,
                  ProductImage: { select: { url: true }, take: 1 },
                },
              },
            },
          },
        },
      });

      if (order) {
        if (session.user.role === 'user') {
          if (session.user.id !== order.userId) {
            throw new Error(`El ${id} no es de ese usuario.`);
          }
        }

        return { ok: true, order };
      }

      throw new Error(`El ${id} no existe.`);
    }

    return { ok: false, message: 'Debe estar autenticado.' };
  } catch (error) {
    console.log(error);

    return { ok: false, message: 'La orden no existe.' };
  }
};
