import { InternalError } from '@/core/errors';
import { invariant, prettyJSON, retry, wait } from '@/core/utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

describe('core/utils', () => {
  describe('invariant', () => {
    it('throws InternalError on falsy', () => {
      expect(() => invariant(false, 'bad')).toThrow(InternalError);
      expect(() => invariant(0, 'zero bad')).toThrowError(/zero bad/);
      expect(() => invariant('', 'empty bad')).toThrow(InternalError);
      expect(() => invariant(null)).toThrow(InternalError);
      expect(() => invariant(undefined)).toThrow(InternalError);
    });

    it('does not throw on truthy', () => {
      expect(() => invariant(true)).not.toThrow();
      expect(() => invariant(1)).not.toThrow();
      expect(() => invariant('ok')).not.toThrow();
      expect(() => invariant({})).not.toThrow();
    });
  });

  describe('wait', () => {
    const realSetTimeout = global.setTimeout;

    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();

      global.setTimeout = realSetTimeout;
    });

    it('resolves after given ms (with fake timers)', async () => {
      const p = wait(500);
      vi.advanceTimersByTime(499);

      await Promise.resolve();
      let done = false;
      p.then(() => {
        done = true;
      });
      await Promise.resolve();
      expect(done).toBe(false);

      vi.advanceTimersByTime(1);
      await Promise.resolve();
      expect(done).toBe(true);
    });
  });

  describe('retry', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });
    afterEach(() => {
      vi.useRealTimers();
    });

    it('returns immediately on first success', async () => {
      const fn = vi.fn().mockResolvedValue('OK');
      const res = retry(fn, 3, 1000);
      await vi.runAllTimersAsync();
      await expect(res).resolves.toBe('OK');
      expect(fn).toHaveBeenCalledTimes(1);
    });

    it('retries on failure and eventually succeeds', async () => {
      const fn = vi
        .fn()
        .mockRejectedValueOnce(new Error('boom1'))
        .mockRejectedValueOnce(new Error('boom2'))
        .mockResolvedValue('DONE');

      const resPromise = retry(fn, 5, 200);

      await vi.runAllTimersAsync();

      await expect(resPromise).resolves.toBe('DONE');

      expect(fn).toHaveBeenCalledTimes(3);
    });

    it('throws last error after exhausting attempts', async () => {
      const e1 = new Error('first');
      const e2 = new Error('second');
      const e3 = new Error('last');

      const fn = vi
        .fn()
        .mockRejectedValueOnce(e1)
        .mockRejectedValueOnce(e2)
        .mockRejectedValueOnce(e3);

      const resPromise = retry(fn, 3, 0);

      await expect(resPromise).rejects.toBe(e3);
      expect(fn).toHaveBeenCalledTimes(3);
    });
  });

  describe('prettyJSON', () => {
    it('stringifies objects prettily', () => {
      const s = prettyJSON({ a: 1, b: 'x' });
      expect(s).toContain('\n');
      expect(s).toContain('"a": 1');
      expect(s).toContain('"b": "x"');
    });

    it('falls back to String() on circular structures', () => {
      const a: any = {};
      a.self = a;
      const s = prettyJSON(a);

      expect(typeof s).toBe('string');
      expect(s.length).toBeGreaterThan(0);
    });

    it('handles primitives', () => {
      expect(prettyJSON('hi')).toBe('"hi"');
      expect(prettyJSON(42)).toBe('42');
      expect(prettyJSON(null)).toBe('null');
    });
  });
});
