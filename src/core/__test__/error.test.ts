import {
  AuthError,
  BaseError,
  ConflictError,
  EnvError,
  errorToHttp,
  ForbiddenError,
  InternalError,
  NotFoundError,
  ValidationError,
} from '@/core/errors';
import { describe, expect, it } from 'vitest';

describe('core/errors', () => {
  it('subclasses inherit from BaseError & Error, keep name/code and pass cause', () => {
    const cases = [
      { Ctor: ValidationError, code: 'VALIDATION_ERROR' as const },
      { Ctor: AuthError, code: 'AUTH_ERROR' as const },
      { Ctor: ForbiddenError, code: 'FORBIDDEN' as const },
      { Ctor: NotFoundError, code: 'NOT_FOUND' as const },
      { Ctor: ConflictError, code: 'CONFLICT' as const },
      { Ctor: InternalError, code: 'INTERNAL_ERROR' as const },
      { Ctor: EnvError, code: 'ENV_ERROR' as const },
    ];

    for (const { Ctor, code } of cases) {
      const cause = { foo: 1 };
      const e = new Ctor('msg', cause);

      expect(e).toBeInstanceOf(Error);
      expect(e).toBeInstanceOf(BaseError);
      expect(e).toBeInstanceOf(Ctor);

      expect(e.name).toBe(Ctor.name);

      expect(e.code).toBe(code);
      expect(e.message).toBe('msg');

      expect(e.cause).toEqual(cause);

      expect(typeof e.stack === 'string' || e.stack === undefined).toBe(true);
    }
  });

  it('errorToHttp maps errors to correct status codes and payload', () => {
    expect(errorToHttp(new ValidationError()).status).toBe(400);
    expect(errorToHttp(new AuthError()).status).toBe(401);
    expect(errorToHttp(new ForbiddenError()).status).toBe(403);
    expect(errorToHttp(new NotFoundError()).status).toBe(404);
    expect(errorToHttp(new ConflictError()).status).toBe(409);
    expect(errorToHttp(new EnvError()).status).toBe(500);
    expect(errorToHttp(new InternalError()).status).toBe(500);

    const generic = errorToHttp(new Error('boom'));
    expect(generic.status).toBe(500);
    expect(generic.body.code).toBe('INTERNAL_ERROR');
    expect(generic.body.message).toMatch(/something went wrong/i);
  });

  it('accepts Error as cause and preserves it', () => {
    const root = new Error('root');
    const e = new InternalError('wrap', root);
    expect(e.cause).toBe(root);

    const http = errorToHttp(e);
    expect(http.body).toEqual({
      code: 'INTERNAL_ERROR',
      message: 'wrap',
    });
  });

  it('default messages exist when not provided', () => {
    expect(new ValidationError().message).toBeTruthy();
    expect(new AuthError().message).toBeTruthy();
    expect(new EnvError().message).toBeTruthy();
  });
});
