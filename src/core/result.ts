// --- Base Result ---
export type Ok<T> = { ok: true; value: T };
export type Err<E> = { ok: false; error: E };
export type Result<T, E> = Ok<T> | Err<E>;

export const ok = <T>(v: T): Ok<T> => ({ ok: true, value: v });
export const err = <E>(e: E): Err<E> => ({ ok: false, error: e });

// --- Field-level errors (field -> messages[]) ---
export type FieldErrors<K extends string = string> = Partial<
  Record<K, string[] | undefined>
>;

// --- FormError with discriminant `kind` ---
export type FormError<K extends string = string> =
  | { kind: 'global'; message: string }
  | { kind: 'fields'; errors: FieldErrors<K> };

// --- FormResult (for server actions / forms) ---
export type FormResult<T, K extends string = string> = Result<T, FormError<K>>;

// --- ServiceResult (for domain/services returning Error subclasses) ---
export type ServiceResult<T, E extends Error> = Result<T, E>;

// --- Helpers for forms ---
export const formError = <K extends string = string>(
  message: string,
): Err<FormError<K>> => err<FormError<K>>({ kind: 'global', message });

export const fieldErrors = <K extends string>(
  fe: FieldErrors<K>,
): Err<FormError<K>> => err<FormError<K>>({ kind: 'fields', errors: fe });

// --- Type guards (handy in UI) ---
export function isFieldError<K extends string = string>(
  e: FormError<K>,
): e is { kind: 'fields'; errors: FieldErrors<K> } {
  return e.kind === 'fields';
}

export function isGlobalError<K extends string = string>(
  e: FormError<K>,
): e is { kind: 'global'; message: string } {
  return e.kind === 'global';
}
