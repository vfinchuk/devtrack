import LoginForm from '@/features/auth/components/login-form';
import SignupForm from '@/features/auth/components/signup-form';
import { verifyAuthSession } from '@/features/auth/server/auth';
import { ROUTES } from '@/shared/config/routes.config';
import { PageProps } from '@/types/page-props';
import { redirect } from 'next/navigation';

export default async function AuthPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const mode = sp?.mode || 'login';

  const { user } = await verifyAuthSession();

  if (user) {
    redirect(ROUTES.DASHBOARD);
  }

  return mode === 'login' ? <LoginForm /> : <SignupForm />;
}
