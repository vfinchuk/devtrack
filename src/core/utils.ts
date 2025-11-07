import { InternalError, logger } from '@/core';

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
) {
  let last;
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (e) {
      last = e;
      if (delayMs) await wait(delayMs);
    }
  }
  throw last;
}

export function prettyJson(input: unknown): string {
  try {
    return JSON.stringify(input, null, 2);
  } catch {
    return String(input);
  }
}
