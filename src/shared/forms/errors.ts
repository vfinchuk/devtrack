import { FieldErrors } from '@/core';

export function hasFieldError<K extends string>(
  errors: FieldErrors<K> | null | undefined,
  key: K,
): boolean {
  return (errors?.[key]?.length ?? 0) > 0;
}

export function getFieldErrors<K extends string>(
  errors: FieldErrors<K> | null | undefined,
  key: K,
): readonly string[] {
  return (errors?.[key] ?? []) as readonly string[];
}

export function makeFieldErrorHelpers<K extends string>(
  errors: FieldErrors<K> | null | undefined,
) {
  return {
    has: (key: K) => hasFieldError(errors, key),
    list: (key: K) => getFieldErrors(errors, key),
    first: (key: K): string | undefined => getFieldErrors(errors, key)[0],
  };
}
