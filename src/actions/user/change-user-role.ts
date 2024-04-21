'use server';

import { revalidatePath } from 'next/cache';

import { auth } from '@/auth.config';

import prisma from '@/libs/prisma';

export const changeUserRole = async (id: string, role: string) => {
  const session = await auth();
  const admin = 'admin';
  const user = 'user';

  if (session?.user.role === admin) {
    const newRole = role === admin ? admin : user;

    try {
      const user = await prisma.user.update({
        where: { id },
        data: { role: newRole },
      });

      revalidatePath('/admin/users');

      return { ok: true, user };
    } catch (error) {
      console.log(error);

      const message = 'No se pudo actualizar el rol, revisar logs.';
      return { ok: false, message };
    }
  }

  const message = 'Debe estar autenticado como admin.';
  return { ok: false, message };
};
