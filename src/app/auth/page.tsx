import { ROUTES } from '@/shared/config/routes.config';
import { verifyAuthSession } from '@/shared/lib/auth';
import { PageProps } from '@/types/page-props';
import { redirect } from 'next/navigation';
import LoginForm from './components/login-form';
import SignupForm from './components/signup-form';

export default async function AuthPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const mode = sp?.mode || 'login';

  const { user } = await verifyAuthSession();

  if (user) {
    redirect(ROUTES.DASHBOARD);
  }

  return mode === 'login' ? <LoginForm /> : <SignupForm />;
}
