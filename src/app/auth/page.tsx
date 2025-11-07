import { PageProps } from '@/types/page-props';
import LoginForm from './components/login-form';
import SignupForm from './components/signup-form';

export default async function AuthPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const mode = sp?.mode || 'login';
  return mode === 'login' ? <LoginForm /> : <SignupForm />;
}
