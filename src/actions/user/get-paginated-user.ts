'use server';

import { auth } from '@/auth.config';

import prisma from '@/libs/prisma';

export const getPaginatedUsers = async () => {
  const session = await auth();
  const admin = 'admin';

  if (session?.user.role === admin) {
    const users = await prisma.user.findMany({ orderBy: { name: 'desc' } });

    return { ok: true, users };
  }

  const message = 'Debe de ser un usuario administrador.';
  return { ok: false, message };
};
