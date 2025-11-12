'use client';

import { FieldErrors } from '@/core';
import * as React from 'react';

type Empty = Record<never, never>;

export function FieldErrorsList<
  K extends string,
  P extends object = Empty,
>(props: {
  errors?: FieldErrors<K> | null;
  field: K;
  Component?: React.ComponentType<{ children: string } & P>;
  componentProps?: P;
  render?: (msg: string, index: number) => React.ReactNode;
}) {
  const { errors, field, Component, componentProps, render } = props;
  const msgs = errors?.[field] ?? [];
  if (msgs.length === 0) return null;

  if (Component) {
    return (
      <>
        {msgs.map((m, i) => (
          <Component key={i} {...(componentProps ?? ({} as P))}>
            {m}
          </Component>
        ))}
      </>
    );
  }

  if (render) {
    return <>{msgs.map((m, i) => render(m, i))}</>;
  }

  return (
    <>
      {msgs.map((m, i) => (
        <p key={i}>{m}</p>
      ))}
    </>
  );
}

export function FieldErrorFirst<
  K extends string,
  P extends object = Empty,
>(props: {
  errors?: FieldErrors<K> | null;
  field: K;
  Component?: React.ComponentType<{ children: string } & P>;
  componentProps?: P;
  render?: (msg: string) => React.ReactNode;
}) {
  const { errors, field, Component, componentProps, render } = props;
  const first = errors?.[field]?.[0];
  if (!first) return null;

  if (Component) {
    const C = Component;
    return <C {...(componentProps ?? ({} as P))}>{first}</C>;
  }

  if (render) {
    return <>{render(first)}</>;
  }

  return <p>{first}</p>;
}
