import { events, logger } from '@/core';

events.on('user.signedUp', async ({ userId, email }) => {
  try {
    logger.info('User signed up', { userId, email });
  } catch (e) {
    logger.error('Failed to signed up', { userId, error: e });
  }
});
