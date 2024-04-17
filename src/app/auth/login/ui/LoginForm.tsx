'use client';

import Link from 'next/link';
import { useFormState } from 'react-dom';

import { authenticate } from '@/actions';

export const LoginForm = () => {
  const [state, dispatch] = useFormState(authenticate, undefined);

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

      <button className='btn-primary' type='submit'>
        Ingresar
      </button>

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
