'use server';

import { errorToHttp } from '@/core/errors';
import { logger } from '@/core/logger';
import { requireUserId } from './require-user';

type AnyFn = (...args: any[]) => any;

/**
 * Wrap a server action to require an authenticated user.
 * Your handler receives (userId, ...args).
 * Errors are logged and rethrown with { status, code } for UI handling.
 */
export function withAuthAction<T extends AnyFn>(
  handler: (userId: string, ...args: Parameters<T>) => ReturnType<T>,
) {
  return async (...args: Parameters<T>): Promise<Awaited<ReturnType<T>>> => {
    const userId = await requireUserId();

    try {
      return await handler(userId, ...args);
    } catch (e) {
      logger.error('withAuthAction failed', { error: e });
      const { status, body } = errorToHttp(e);
      // rethrow so forms / fetchers can handle status/message
      throw Object.assign(new Error(body.message), { status, code: body.code });
    }
  };
}
