'use server';

import { requireUserId } from './require-user';

export async function withAuthForm<S, R>(
  handler: (userId: string, state: S, formData: FormData) => R | Promise<R>,
) {
  return async (state: S, formData: FormData): Promise<R> => {
    const userId = await requireUserId();
    return await handler(userId, state, formData);
  };
}
