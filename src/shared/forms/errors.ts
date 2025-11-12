import type { FieldErrors, FormError } from '@/core/result';

export function getFieldsBlock<K extends string>(
  e: FormError<K> | null | undefined,
): FieldErrors<K> | undefined {
  return e?.kind === 'fields' ? e.errors : undefined;
}

export function getGlobalMessage<K extends string>(
  e: FormError<K> | null | undefined,
): string | undefined {
  return e?.kind === 'global' ? e.message : undefined;
}

export function hasFieldError<K extends string>(
  e: FormError<K> | null | undefined,
  key: K,
): boolean {
  const fe = getFieldsBlock(e);
  return (fe?.[key]?.length ?? 0) > 0;
}

export function getFieldErrors<K extends string>(
  e: FormError<K> | null | undefined,
  key: K,
): readonly string[] {
  const fe = getFieldsBlock(e);
  return (fe?.[key] ?? []) as readonly string[];
}

export function makeFieldErrorHelpers<K extends string>(
  e: FormError<K> | null | undefined,
) {
  return {
    has: (key: K) => hasFieldError(e, key),
    list: (key: K) => getFieldErrors(e, key),
    first: (key: K): string | undefined => getFieldErrors(e, key)[0],
    global: () => getGlobalMessage(e),
  };
}
