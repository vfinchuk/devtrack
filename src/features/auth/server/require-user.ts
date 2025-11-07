'use server';

import { logger } from '@/core/logger';
import { ROUTES } from '@/shared/config/routes.config';
import { verifyAuth } from '@/shared/lib/auth';
import { redirect } from 'next/navigation';

export async function requireUser() {
  let session;

  try {
    session = await verifyAuth();
  } catch (e) {
    logger.error('verifyAuth failed', { error: e });
    redirect(ROUTES.AUTH);
  }

  if (!session?.user) {
    logger.warn('requireUser: no user, redirecting to auth');
    redirect(ROUTES.AUTH);
  }

  return session.user;
}

export async function requireUserId(): Promise<string> {
  const user = await requireUser();
  return user.id;
}
