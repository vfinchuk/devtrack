'use client';

import type { FormError } from '@/core/result';
import { GlobalFormError } from '@/shared/forms/form-errors';
import * as React from 'react';

type Empty = Record<never, never>;

export type FormProps<
  K extends string,
  S extends { ok?: boolean; error?: FormError<K> | null } | null,
  P extends object = Empty,
> = {
  state: S;
  action: (formData: FormData) => void;
  id?: string;
  className?: string;
  ErrorComponent?: React.ComponentType<{ children: string } & P>;
  componentProps?: P;
  children: React.ReactNode;
};

export function Form<
  K extends string,
  S extends { ok?: boolean; error?: FormError<K> | null } | null,
  P extends object = Empty,
>({
  state,
  action,
  id,
  className,
  ErrorComponent,
  componentProps,
  children,
}: FormProps<K, S, P>) {
  const error = state && state.ok === false ? state.error : null;

  return (
    <form id={id} action={action} noValidate className={className}>
      {error && (
        <GlobalFormError<K, P>
          error={error}
          Component={
            ErrorComponent ??
            (({ children }) => (
              <p role="status" className="mb-2 text-sm text-destructive">
                {children}
              </p>
            ))
          }
          componentProps={componentProps}
        />
      )}

      {children}
    </form>
  );
}
