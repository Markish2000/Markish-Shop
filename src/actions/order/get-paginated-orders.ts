'use server';

import { auth } from '@/auth.config';

import prisma from '@/libs/prisma';

export const getPaginatedOrders = async () => {
  const session = await auth();
  const admin = 'admin';

  if (session?.user.role === admin) {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        OrderAddress: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    return { ok: true, orders };
  }

  const message = 'Debe estar autenticado.';
  return { ok: false, message };
};
