'use server';

import bcryptjs from 'bcryptjs';

import prisma from '@/libs/prisma';

export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const user = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        password: bcryptjs.hashSync(password),
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    const message = 'Usuario creado.';
    return { ok: true, user, message };
  } catch (error) {
    console.log(error);

    const message = 'No se pudo crear el usuario.';
    return { ok: false, message };
  }
};
