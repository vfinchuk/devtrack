export type Ok<T> = { ok: true; value: T };
export type Err<E = unknown> = { ok: false; errors: E };
export type Result<T, E = unknown> = Ok<T> | Err<E>;

export const ok = <T>(v: T): Ok<T> => ({ ok: true, value: v });
export const err = <E>(e: E): Err<E> => ({ ok: false, errors: e });

export type FieldErrors<K extends string = string, V = string[]> = Partial<
  Record<K, V | undefined>
>;

export type FormResult<T, K extends string = string> = Result<
  T,
  FieldErrors<K>
>;
