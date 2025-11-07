import { err, ok, type Result } from '@/core/result';
import { describe, expect, it } from 'vitest';

const demo = (n: number): Result<number, 'NEG'> => {
  return n >= 0 ? ok(n * 2) : err('NEG');
};

describe('core/result', () => {
  it('ok branch holds value', () => {
    const r = demo(2);
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.value).toBe(4);
    }
  });

  it('err branch holds error', () => {
    const r = demo(-1);
    expect(r.ok).toBe(false);
    if (!r.ok) {
      expect(r.error).toBe('NEG');
    }
  });

  it('helpers create exact shapes', () => {
    const a = ok({ x: 1 });
    const b = err(new Error('x'));
    expect(a).toEqual({ ok: true, value: { x: 1 } });
    expect(b.ok).toBe(false);
  });
});
