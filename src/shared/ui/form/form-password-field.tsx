'use client';

import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { FormError } from '@/core';
import { hasFieldError } from '@/shared/forms/errors';
import { FieldErrorFirst } from '@/shared/forms/form-errors';
import { cn } from '@/shared/lib/utils';
import { Eye, EyeOff } from 'lucide-react';
import * as React from 'react';

type StateWithFormError<TField extends string> =
  | null
  | { ok: true }
  | { ok: false; error: FormError<TField> };

export type FormPasswordFieldProps<TField extends string> = {
  state: StateWithFormError<TField>;
  field: TField;
  label: string;
  labelExtra?: React.ReactNode;
  placeholder?: string;
  required?: boolean;
  id?: string;
  name?: string;
  inputProps?: Omit<
    React.ComponentProps<typeof Input>,
    'id' | 'name' | 'type' | 'placeholder' | 'required' | 'aria-invalid'
  >;
};

export function FormPasswordField<TField extends string>({
  state,
  field,
  label,
  labelExtra,
  placeholder,
  required,
  id,
  name,
  inputProps,
}: FormPasswordFieldProps<TField>) {
  const [visible, setVisible] = React.useState(false);

  const fieldId = id ?? field;
  const inputName = name ?? field;

  const error = state?.ok === false ? state.error : null;
  const isInvalid = error ? hasFieldError(error, field) : false;

  const { className: inputClassName, ...restInputProps } = inputProps ?? {};

  return (
    <Field>
      {labelExtra ? (
        <div className="flex items-center gap-2">
          <FieldLabel htmlFor={fieldId}>{label}</FieldLabel>
          <div className="ml-auto">{labelExtra}</div>
        </div>
      ) : (
        <FieldLabel htmlFor={fieldId}>{label}</FieldLabel>
      )}

      <div className="relative">
        <Input
          id={fieldId}
          name={inputName}
          type={visible ? 'text' : 'password'}
          placeholder={placeholder}
          required={required}
          aria-invalid={isInvalid || undefined}
          className={cn('pr-9', inputClassName)}
          {...restInputProps}
        />

        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex h-6 w-6 items-center justify-center rounded-sm text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          aria-label={visible ? 'Hide password' : 'Show password'}
        >
          {visible ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>
      </div>

      <div className="min-h-[1rem]">
        <FieldErrorFirst error={error} field={field} Component={FieldError} />
      </div>
    </Field>
  );
}
