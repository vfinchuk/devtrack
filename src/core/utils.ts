import { InternalError } from '@/core/errors';
import { logger } from '@/core/logger';

export const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

export function invariant(
  cond: unknown,
  message = 'Invariant failed',
): asserts cond {
  if (!cond) {
    logger.error('Invariant violation', { message });
    throw new InternalError(message);
  }
}

export async function retry<T>(
  fn: () => Promise<T>,
  attempts = 3,
  delayMs = 0,
): Promise<T> {
  let last: unknown;
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (e) {
      last = e;
      if (delayMs > 0) {
        await wait(delayMs);
      }
    }
  }
  throw last instanceof Error ? last : new Error(String(last));
}

export function prettyJSON(input: unknown): string {
  try {
    return JSON.stringify(input, null, 2);
  } catch {
    return String(input);
  }
}
