import { redirect } from 'next/navigation';

import { auth } from '@/auth.config';

interface Props {
  children: React.ReactNode;
}

export default async function ShopLayout({ children }: Readonly<Props>) {
  const session = await auth();

  if (session?.user) redirect('/');

  return (
    <main className='flex justify-center'>
      <div className='w-full sm:w-[350px] px-10'>{children}</div>
    </main>
  );
}
