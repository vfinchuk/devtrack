'use client';

import type { FieldErrors, FormError } from '@/core/result';
import * as React from 'react';
import { getFieldsBlock, getGlobalMessage } from './errors';

type Empty = Record<never, never>;

/**
 * 🔹 FieldErrorsList — renders all messages for a specific field.
 * Supports both full FormError and raw FieldErrors objects.
 */
export function FieldErrorsList<
  K extends string,
  P extends object = Empty,
>(props: {
  error?: FormError<K> | null;
  errors?: FieldErrors<K> | null;
  field: K;
  Component?: React.ComponentType<{ children: string } & P>;
  componentProps?: P;
  render?: (msg: string, index: number) => React.ReactNode;
}) {
  const { error, errors, field, Component, componentProps, render } = props;

  // Prefer direct FieldErrors if provided; fallback to extracting from FormError
  const fieldErrors = errors ?? getFieldsBlock(error);
  const msgs = fieldErrors?.[field] ?? [];

  if (msgs.length === 0) return null;

  if (Component) {
    const Comp = Component;
    return (
      <>
        {msgs.map((msg, i) => (
          <Comp key={i} {...(componentProps ?? ({} as P))}>
            {msg}
          </Comp>
        ))}
      </>
    );
  }

  if (render) {
    return <>{msgs.map((msg, i) => render(msg, i))}</>;
  }

  return (
    <>
      {msgs.map((msg, i) => (
        <p key={i}>{msg}</p>
      ))}
    </>
  );
}

/**
 * 🔹 FieldErrorFirst — renders only the first error message for a given field.
 * Accepts a custom component or render function.
 */
export function FieldErrorFirst<
  K extends string,
  P extends object = Empty,
>(props: {
  error?: FormError<K> | null;
  errors?: FieldErrors<K> | null;
  field: K;
  Component?: React.ComponentType<{ children: string } & P>;
  componentProps?: P;
  render?: (msg: string) => React.ReactNode;
}) {
  const { error, errors, field, Component, componentProps, render } = props;
  const fieldErrors = errors ?? getFieldsBlock(error);
  const first = fieldErrors?.[field]?.[0];
  if (!first) return null;

  if (Component) {
    const Comp = Component;
    return <Comp {...(componentProps ?? ({} as P))}>{first}</Comp>;
  }

  if (render) {
    return <>{render(first)}</>;
  }

  return <p>{first}</p>;
}

/**
 * 🔹 GlobalFormError — renders a top-level (global) form error message.
 * Typically used for banner or toast-like messages.
 */
export function GlobalFormError<
  K extends string = string,
  P extends object = Empty,
>(props: {
  error?: FormError<K> | null;
  Component?: React.ComponentType<{ children: string } & P>;
  componentProps?: P;
  render?: (msg: string) => React.ReactNode;
}) {
  const { error, Component, componentProps, render } = props;
  const msg = getGlobalMessage(error);
  if (!msg) return null;

  if (Component) {
    const Comp = Component;
    return <Comp {...(componentProps ?? ({} as P))}>{msg}</Comp>;
  }

  if (render) {
    return <>{render(msg)}</>;
  }

  return <p>{msg}</p>;
}
