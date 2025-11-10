'use server';

import { requireUserId } from './require-user';

export async function withAuth<P extends readonly unknown[], R>(
  handler: (userId: string, ...args: P) => R | Promise<R>,
) {
  return async (...args: P): Promise<R> => {
    const userId = await requireUserId();
    return await handler(userId, ...args);
  };
}
