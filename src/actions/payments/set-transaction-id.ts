'use server';

import prisma from '@/libs/prisma';

export const setTransactionId = async (id: string, transactionId: string) => {
  try {
    const order = await prisma.order.update({
      where: { id },
      data: { transactionId },
    });

    if (order) return { ok: true };

    return {
      ok: false,
      message: `No se encontró una orden con el id ${id}`,
    };
  } catch (error) {
    console.log(error);

    return {
      ok: false,
      message: 'No se pudo actualizar el id de la transacción.',
    };
  }
};
