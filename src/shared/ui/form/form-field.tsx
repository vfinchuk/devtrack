'use client';

import { Input } from '@/components/ui/input';
import { FormError } from '@/core';
import { hasFieldError } from '@/shared/forms/errors';
import { FieldErrorFirst } from '@/shared/forms/form-errors';
import * as React from 'react';
import { Field, FieldError, FieldLabel } from './field';

type StateWithFormError<TField extends string> =
  | null
  | { ok: true }
  | { ok: false; error: FormError<TField> };

export type FormFieldProps<TField extends string> = {
  state: StateWithFormError<TField>;
  field: TField;
  label: string;
  labelExtra?: React.ReactNode;
  type?: React.InputHTMLAttributes<HTMLInputElement>['type'];
  placeholder?: string;
  required?: boolean;
  id?: string;
  name?: string;
  inputProps?: Omit<
    React.ComponentProps<typeof Input>,
    'id' | 'name' | 'type' | 'placeholder' | 'required' | 'aria-invalid'
  >;
};

export function FormField<TField extends string>({
  state,
  field,
  label,
  labelExtra,
  type = 'text',
  placeholder,
  required,
  id,
  name,
  inputProps,
}: FormFieldProps<TField>) {
  const fieldId = id ?? field;
  const inputName = name ?? field;

  const error = state?.ok === false ? state.error : null;
  const isInvalid = error ? hasFieldError(error, field) : false;

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

      <Input
        id={fieldId}
        name={inputName}
        type={type}
        placeholder={placeholder}
        required={required}
        aria-invalid={isInvalid || undefined}
        {...inputProps}
      />

      <FieldErrorFirst error={error} field={field} Component={FieldError} />
    </Field>
  );
}
