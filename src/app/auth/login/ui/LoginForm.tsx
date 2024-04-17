'use client';

import { useEffect } from 'react';

import Link from 'next/link';
import { useFormState, useFormStatus } from 'react-dom';

import { authenticate } from '@/actions';
import { IoInformationOutline } from 'react-icons/io5';
import clsx from 'clsx';

export const LoginForm = () => {
  const [state, dispatch] = useFormState(authenticate, undefined);

  useEffect(() => {
    if (state === 'Success') window.location.replace('/');
  }, [state]);

  return (
    <form action={dispatch} className='flex flex-col'>
      <label htmlFor='email'>Correo electrónico</label>
      <input
        className='px-5 py-2 border bg-gray-200 rounded mb-5'
        type='email'
        name='email'
      />

      <label htmlFor='password'>Contraseña</label>
      <input
        className='px-5 py-2 border bg-gray-200 rounded mb-5'
        type='password'
        name='password'
      />
      <div
        className='flex h-8 items-end space-x-1'
        aria-live='polite'
        aria-atomic='true'
      >
        {state === 'CredentialsSignIn' && (
          <div className='flex flex-row mb-2'>
            <IoInformationOutline className='h-5 w-5 text-red-500' />
            <p className='text-sm text-red-500'>
              Las credenciales no son correctas.
            </p>
          </div>
        )}
      </div>

      <LoginButton />

      <div className='flex items-center my-5'>
        <div className='flex-1 border-t border-gray-500'></div>
        <div className='px-2 text-gray-800'>O</div>
        <div className='flex-1 border-t border-gray-500'></div>
      </div>

      <Link className='btn-secondary text-center' href='/auth/new-account'>
        Crear una nueva cuenta
      </Link>
    </form>
  );
};

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className={clsx({ 'btn-primary': !pending, 'btn-disabled': pending })}
      type='submit'
      disabled={pending}
    >
      Ingresar
    </button>
  );
}
