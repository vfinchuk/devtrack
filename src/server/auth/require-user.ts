import { ROUTES } from '@/shared/config/routes.config';
import { verifyAuth } from '@/shared/lib/auth';
import { redirect } from 'next/navigation';

export async function requireUser() {
  const { user } = await verifyAuth();
  if (!user) {
    redirect(ROUTES.AUTH);
  }

  return user;
}
