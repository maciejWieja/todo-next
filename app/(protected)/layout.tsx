import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import MainLayout from '../ui/main-layout';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  return <MainLayout>{children}</MainLayout>;
}
