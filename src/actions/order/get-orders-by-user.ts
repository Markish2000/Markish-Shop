'use server';

import { auth } from '@/auth.config';

import prisma from '@/libs/prisma';

export const getOrdersByUser = async () => {
  const session = await auth();

  if (session?.user) {
    const orders = await prisma.order.findMany({
      where: { userId: session.user.id },
      include: {
        OrderAddress: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    return {
      ok: true,
      orders,
    };
  }

  return {
    ok: false,
    message: 'Debe estar autenticado.',
  };
};
