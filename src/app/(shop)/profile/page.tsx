import { Title } from '@/components';

import { auth } from '@/auth.config';
import { redirect } from 'next/navigation';

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/');
    // redirect('/auth/login?returnTo=perfil');
  }

  return (
    <div>
      <Title title='Perfil' />
      <pre>{JSON.stringify(session.user, null, 2)}</pre>

      <h3 className='text-3xl'>{session.user.role}</h3>
    </div>
  );
}
