import LoginForm from '@/components/auth/login-form';
import SignupForm from '@/components/auth/signup-form';
import { PageProps } from '@/types/page-props';

export default async function AuthPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const mode = sp?.mode || 'login';
  return mode === 'login' ? <LoginForm /> : <SignupForm />;
}
