'use server';

import prisma from '@/libs/prisma';

export const deleteUserAddress = async (userId: string) => {
  try {
    await prisma.userAddress.delete({ where: { userId } });

    return { ok: true };
  } catch (error) {
    console.log(error);

    const message = 'No se pudo eliminar la dirección.';
    return { ok: false, message };
  }
};
