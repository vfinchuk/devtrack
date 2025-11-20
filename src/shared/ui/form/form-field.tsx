'use client';

import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { FormError } from '@/core';
import { hasFieldError } from '@/shared/forms/errors';
import { FieldErrorFirst } from '@/shared/forms/form-errors';
import * as React from 'react';

export type StateWithFormError<TField extends string> =
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
  defaultValue?: React.InputHTMLAttributes<HTMLInputElement>['defaultValue'];
  inlineAddon?: React.ReactNode;
  inputProps?: Omit<
    React.ComponentProps<typeof Input>,
    | 'id'
    | 'name'
    | 'type'
    | 'placeholder'
    | 'required'
    | 'aria-invalid'
    | 'defaultValue'
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
  defaultValue,
  inlineAddon,
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

      <div className="flex items-end gap-2">
        <Input
          id={fieldId}
          name={inputName}
          type={type}
          placeholder={placeholder}
          required={required}
          aria-invalid={isInvalid || undefined}
          defaultValue={defaultValue}
          {...inputProps}
        />

        {inlineAddon ? <div className="shrink-0">{inlineAddon}</div> : null}
      </div>

      <div className="min-h-[1rem]">
        <FieldErrorFirst error={error} field={field} Component={FieldError} />
      </div>
    </Field>
  );
}
