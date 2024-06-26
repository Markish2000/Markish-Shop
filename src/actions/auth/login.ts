'use server';

import { signIn } from '@/auth.config';

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn('credentials', {
      ...Object.fromEntries(formData),
      redirect: false,
    });

    return 'Success';
  } catch (error) {
    return 'CredentialsSignIn';
  }
}

export const login = async (email: string, password: string) => {
  try {
    await signIn('credentials', { email, password });

    return { ok: true };
  } catch (error) {
    console.log(error);

    const message = 'No se pudo iniciar sesión.';
    return { ok: false, message };
  }
};
