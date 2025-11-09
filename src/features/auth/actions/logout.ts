'use server';

import { events, logger } from '@/core';
import {
  destroyAuthSession,
  verifyAuthSession,
} from '@/features/auth/server/auth';
import { ROUTES } from '@/shared/config/routes.config';
import { redirect } from 'next/navigation';

export async function logout() {
  try {
    const { user } = await verifyAuthSession();

    if (user) {
      try {
        await events.emit('user.loggedOut', { userId: user.id });
        logger.info('User logged out', { userId: user.id });
      } catch (e) {
        logger.error('Emit user.loggedOut failed', {
          error: e,
          userId: user.id,
        });
      }
    }

    await destroyAuthSession();
  } catch (error) {
    logger.error('Logout failed', { error });
  } finally {
    redirect(ROUTES.AUTH);
  }
}
