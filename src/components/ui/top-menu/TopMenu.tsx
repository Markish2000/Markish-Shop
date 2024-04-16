'use client';

import Link from 'next/link';

import { IoCartOutline, IoSearchOutline } from 'react-icons/io5';

import { useCartStore, useUIStore } from '@/store';

import { titleFont } from '@/config/fonts';
import { useEffect, useState } from 'react';

export const TopMenu = () => {
  const openSideMenu = useUIStore((state) => state.openSideMenu);
  const totalItemsInCart = useCartStore((state) => state.getTotalItems());
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <nav className='flex px-5 justify-between items-center w-full'>
      <div>
        <Link href='/'>
          <span className={`${titleFont.className} antialiased font-bold`}>
            Markish
          </span>
          <span> | Shop</span>
        </Link>
      </div>
      <div className='hidden sm:block'>
        <Link
          className='m-2 p-2 rounded-md transition-all hover:bg-gray-100'
          href='/gender/men'
        >
          Hombres
        </Link>
        <Link
          className='m-2 p-2 rounded-md transition-all hover:bg-gray-100'
          href='/gender/women'
        >
          Mujeres
        </Link>
        <Link
          className='m-2 p-2 rounded-md transition-all hover:bg-gray-100'
          href='/gender/kid'
        >
          Niños
        </Link>
      </div>

      <div className='flex items-center'>
        <Link className='mx-2' href='/search'>
          <IoSearchOutline className='w-5 h-5' />
        </Link>

        <Link className='mx-2' href='/cart'>
          <div className='relative'>
            {loaded && totalItemsInCart > 0 && (
              <span className='absolute text-xs px-1 rounded-full font-bold -top-2 -right-2 bg-blue-700 text-white'>
                {totalItemsInCart}
              </span>
            )}
            <IoCartOutline className='w-5 h-5' />
          </div>
        </Link>

        <button
          className='m-2 p-2 rounded-md transition-all hover:bg-gray-100'
          onClick={openSideMenu}
        >
          Menú
        </button>
      </div>
    </nav>
  );
};
