'use client';

import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Textarea } from '@/components/ui/textarea';
import { FormError } from '@/core';
import { hasFieldError } from '@/shared/forms/errors';
import { FieldErrorFirst } from '@/shared/forms/form-errors';
import * as React from 'react';

export type StateWithFormError<TField extends string> =
  | null
  | { ok: true }
  | { ok: false; error: FormError<TField> };

export type FormTextareaFieldProps<TField extends string> = {
  state: StateWithFormError<TField>;
  field: TField;
  label: string;
  placeholder?: string;
  required?: boolean;
  id?: string;
  name?: string;
  rows?: number;
  defaultValue?: React.InputHTMLAttributes<HTMLInputElement>['type'];
  textareaProps?: Omit<
    React.ComponentProps<typeof Textarea>,
    | 'id'
    | 'name'
    | 'rows'
    | 'placeholder'
    | 'required'
    | 'aria-invalid'
    | 'defaultValue'
  >;
};

export function FormTextareaField<TField extends string>({
  state,
  field,
  label,
  placeholder,
  required,
  id,
  name,
  rows = 3,
  defaultValue,
  textareaProps,
}: FormTextareaFieldProps<TField>) {
  const fieldId = id ?? field;
  const inputName = name ?? field;

  const error = state?.ok === false ? state.error : null;
  const isInvalid = error ? hasFieldError(error, field) : false;

  return (
    <Field>
      <FieldLabel htmlFor={fieldId}>{label}</FieldLabel>

      <Textarea
        id={fieldId}
        name={inputName}
        placeholder={placeholder}
        required={required}
        rows={rows}
        aria-invalid={isInvalid || undefined}
        defaultValue={defaultValue}
        {...textareaProps}
      />

      <div className="min-h-[1rem]">
        <FieldErrorFirst error={error} field={field} Component={FieldError} />
      </div>
    </Field>
  );
}
