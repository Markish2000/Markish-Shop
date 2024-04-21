import { redirect } from 'next/navigation';

import { auth } from '@/auth.config';

interface Props {
  children: React.ReactNode;
}

export default async function AdminLayout({ children }: Readonly<Props>) {
  const session = await auth();
  const admin = 'admin';

  if (session?.user.role !== admin) redirect('/login');

  return <>{children}</>;
}
