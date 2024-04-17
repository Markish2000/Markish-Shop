'use client';

import {
  IoCloseOutline,
  IoLogInOutline,
  IoLogOutOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoSearchOutline,
  IoShirtOutline,
  IoTicketOutline,
} from 'react-icons/io5';
import { useSession } from 'next-auth/react';
import clsx from 'clsx';
import Link from 'next/link';

import { useUIStore } from '@/store';

import { logout } from '@/actions';

export const Sidebar = () => {
  const isSideMenuOpen = useUIStore((state) => state.isSideMenuOpen);
  const closeSideMenu = useUIStore((state) => state.closeSideMenu);

  const { data: session } = useSession();
  const isAuthenticated = !!session?.user;
  const isAdmin = session?.user.role === 'admin';

  return (
    <div>
      {isSideMenuOpen && (
        <button
          className='fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30'
          onClick={closeSideMenu}
        />
      )}

      {isSideMenuOpen && (
        <div className='fade-in fixed top-0 left-0 w-screen h-screen <-10 backdrop-filter backdrop-blur-sm' />
      )}

      <nav
        className={clsx(
          'fixed p-5 right-0 top-0 w-[500px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300',
          { 'translate-x-full': !isSideMenuOpen }
        )}
      >
        <IoCloseOutline
          className='absolute top-5 right-5 cursor-pointer'
          size={50}
          onClick={() => closeSideMenu()}
        />

        <div className='relative mt-14'>
          <IoSearchOutline className='absolute top-2 left-2' size={20} />
          <input
            className='w-full bg-gray-50 rounded pl-10 py-1 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-500'
            type='text'
            placeholder='Buscar'
          />
        </div>

        {isAuthenticated && (
          <>
            <Link
              className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
              href='/profile'
              onClick={() => closeSideMenu()}
            >
              <IoPersonOutline size={30} />
              <span className='ml-3 text-xl'>Perfil</span>
            </Link>

            <Link
              className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
              href='/'
            >
              <IoTicketOutline size={30} />
              <span className='ml-3 text-xl'>Ordenes</span>
            </Link>
          </>
        )}

        {!isAuthenticated && (
          <Link
            className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
            href='/auth/login'
            onClick={() => closeSideMenu()}
          >
            <IoLogInOutline size={30} />
            <span className='ml-3 text-xl'>Ingresar</span>
          </Link>
        )}

        {isAuthenticated && (
          <button
            className='flex w-full items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
            onClick={() => logout()}
          >
            <IoLogOutOutline size={30} />
            <span className='ml-3 text-xl'>Salir</span>
          </button>
        )}

        {isAdmin && (
          <>
            <div className='w-full h-px bg-gray-200 my-10' />

            <Link
              className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
              href='/'
            >
              <IoShirtOutline size={30} />
              <span className='ml-3 text-xl'>Productos</span>
            </Link>
            <Link
              className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
              href='/'
            >
              <IoTicketOutline size={30} />
              <span className='ml-3 text-xl'>Ordenes</span>
            </Link>

            <Link
              className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
              href='/'
            >
              <IoPeopleOutline size={30} />
              <span className='ml-3 text-xl'>Usuarios</span>
            </Link>
          </>
        )}
      </nav>
    </div>
  );
};
