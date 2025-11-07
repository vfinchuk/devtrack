import { ROUTES } from '@/shared/config/routes.config';
import { SessionUser, verifyAuth } from '@/shared/lib/auth';
import { redirect } from 'next/navigation';

export function withAuthAction<TArgs extends any[], TResult>(
  fn: (user: SessionUser, ...args: TArgs) => Promise<TResult>,
) {
  return async (...args: TArgs) => {
    const { user } = await verifyAuth();
    if (!user) redirect(ROUTES.AUTH);
    return fn(user!, ...args);
  };
}
