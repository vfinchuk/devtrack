'use server';

import { logger } from '@/core/logger';
import { verifyAuthSession } from '@/features/auth/server/auth';
import { ROUTES } from '@/shared/config/routes.config';
import { redirect } from 'next/navigation';

export async function requireUser() {
  let session;

  try {
    session = await verifyAuthSession();
  } catch (e) {
    logger.error('Verify Auth failed', { error: e });

    redirect(ROUTES.AUTH);
  }

  if (!session?.user) {
    redirect(ROUTES.AUTH);
  }

  return session.user;
}

export async function requireUserId(): Promise<string> {
  const user = await requireUser();
  return user.id;
}
