export type ErrorCode =
  | 'VALIDATION_ERROR'
  | 'AUTH_ERROR'
  | 'FORBIDDEN'
  | 'NOT_FOUND'
  | 'CONFLICT'
  | 'INTERNAL_ERROR'
  | 'ENV_ERROR';

export type ErrorCause = unknown;

export abstract class BaseError extends Error {
  public readonly code: ErrorCode;
  public readonly cause?: ErrorCause;

  protected constructor(message: string, code: ErrorCode, cause?: ErrorCause) {
    super(message);
    this.code = code;
    this.cause = cause;
    this.name = new.target.name;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class ValidationError extends BaseError {
  constructor(message = 'Validation failed', cause?: ErrorCause) {
    super(message, 'VALIDATION_ERROR', cause);
  }
}
export class AuthError extends BaseError {
  constructor(message = 'Unauthorized', cause?: ErrorCause) {
    super(message, 'AUTH_ERROR', cause);
  }
}
export class ForbiddenError extends BaseError {
  constructor(message = 'Forbidden', cause?: ErrorCause) {
    super(message, 'FORBIDDEN', cause);
  }
}
export class NotFoundError extends BaseError {
  constructor(message = 'Not found', cause?: ErrorCause) {
    super(message, 'NOT_FOUND', cause);
  }
}
export class ConflictError extends BaseError {
  constructor(message = 'Conflict', cause?: ErrorCause) {
    super(message, 'CONFLICT', cause);
  }
}
export class InternalError extends BaseError {
  constructor(message = 'Internal error', cause?: ErrorCause) {
    super(message, 'INTERNAL_ERROR', cause);
  }
}
export class EnvError extends BaseError {
  constructor(
    message = 'Invalid environment configuration',
    cause?: ErrorCause,
  ) {
    super(message, 'ENV_ERROR', cause);
  }
}

export function errorToHttp(e: unknown): {
  status: number;
  body: { code: string; message: string };
} {
  if (e instanceof ValidationError)
    return { status: 400, body: { code: e.code, message: e.message } };
  if (e instanceof AuthError)
    return { status: 401, body: { code: e.code, message: e.message } };
  if (e instanceof ForbiddenError)
    return { status: 403, body: { code: e.code, message: e.message } };
  if (e instanceof NotFoundError)
    return { status: 404, body: { code: e.code, message: e.message } };
  if (e instanceof ConflictError)
    return { status: 409, body: { code: e.code, message: e.message } };
  if (e instanceof EnvError)
    return { status: 500, body: { code: e.code, message: e.message } };
  if (e instanceof InternalError)
    return { status: 500, body: { code: e.code, message: e.message } };
  return {
    status: 500,
    body: { code: 'INTERNAL_ERROR', message: 'Something went wrong' },
  };
}
