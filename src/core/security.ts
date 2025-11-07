import crypto from 'node:crypto';

export function hashSha256(value: string) {
  return crypto.createHash('sha256').update(value).digest('hex');
}

export function safeEqual(a: string, b: string) {
  return crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b));
}
