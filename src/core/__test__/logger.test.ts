import { logger } from '@/core/logger';
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  MockInstance,
  vi,
} from 'vitest';

vi.mock('@/core/utils', () => ({
  prettyJSON: (obj: any) => `MOCK:${JSON.stringify(obj)}`,
}));

describe('ConsoleLogger', () => {
  let infoSpy: MockInstance;
  let warnSpy: MockInstance;
  let errorSpy: MockInstance;
  let debugSpy: MockInstance;

  beforeEach(() => {
    infoSpy = vi.spyOn(console, 'info').mockImplementation(() => {});
    warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    debugSpy = vi.spyOn(console, 'debug').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('info: logs message and fields through prettyJSON', () => {
    logger.info('Hello', { userId: 'u1', count: 2 });

    expect(infoSpy).toHaveBeenCalledTimes(1);
    const out = infoSpy.mock.calls[0][0] as string;
    expect(out.startsWith('MOCK:')).toBe(true);
    expect(out).toContain('"level":"INFO"');
    expect(out).toContain('"message":"Hello"');
    expect(out).toContain('"userId":"u1"');
    expect(out).toContain('"count":2');

    expect(out).toContain('"timestamp":');
  });

  it('warn: logs message and fields', () => {
    logger.warn('Be careful', { a: 123 });

    expect(warnSpy).toHaveBeenCalledTimes(1);
    const out = warnSpy.mock.calls[0][0] as string;
    expect(out).toContain('"level":"WARNING"');
    expect(out).toContain('"message":"Be careful"');
    expect(out).toContain('"a":123');
  });

  it('error: logs message and fields', () => {
    logger.error('Oops', { trace: 'stack' });

    expect(errorSpy).toHaveBeenCalledTimes(1);
    const out = errorSpy.mock.calls[0][0] as string;
    expect(out).toContain('"level":"ERROR"');
    expect(out).toContain('"message":"Oops"');
    expect(out).toContain('"trace":"stack"');
  });

  it('debug: logs in non-production', () => {
    vi.stubEnv('NODE_ENV', 'development');

    logger.debug('Debug msg', { x: 1 });

    expect(debugSpy).toHaveBeenCalledTimes(1);
    const out = debugSpy.mock.calls[0][0] as string;
    expect(out).toContain('"level":"DEBUG"');
    expect(out).toContain('"message":"Debug msg"');
    expect(out).toContain('"x":1');

    vi.unstubAllEnvs();
  });

  it('debug: does NOT log in production', () => {
    vi.stubEnv('NODE_ENV', 'production');

    logger.debug('Should not appear', { hidden: true });

    expect(debugSpy).not.toHaveBeenCalled();

    vi.unstubAllEnvs();
  });

  it('handles empty fields objects gracefully', () => {
    logger.info('Only message');
    expect(infoSpy).toHaveBeenCalledTimes(1);
    const out = infoSpy.mock.calls[0][0] as string;
    expect(out).toContain('"message":"Only message"');
  });
});
