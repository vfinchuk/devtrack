'use client';

import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { FormError } from '@/core';
import { hasFieldError } from '@/shared/forms/errors';
import { FieldErrorFirst } from '@/shared/forms/form-errors';
import * as React from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export type StateWithFormError<TField extends string> =
  | null
  | { ok: true }
  | { ok: false; error: FormError<TField> };

export type FormSelectOption = {
  value: string;
  label: React.ReactNode;
};

export type FormSelectFieldProps<TField extends string> = {
  state: StateWithFormError<TField>;
  field: TField;
  label: string;
  labelExtra?: React.ReactNode;
  placeholder?: string;
  required?: boolean;
  id?: string;
  name?: string;
  options: FormSelectOption[];
  defaultValue?: string;
  inlineAddon?: React.ReactNode;
  forceValue?: string;
  triggerProps?: Omit<
    React.ComponentProps<typeof SelectTrigger>,
    'id' | 'aria-invalid'
  >;
  selectProps?: Omit<
    React.ComponentProps<typeof Select>,
    'value' | 'onValueChange' | 'defaultValue'
  >;
};

export function FormSelectField<TField extends string>({
  state,
  field,
  label,
  labelExtra,
  placeholder = 'Select…',
  required,
  id,
  name,
  options,
  defaultValue,
  inlineAddon,
  forceValue,
  triggerProps,
  selectProps,
}: FormSelectFieldProps<TField>) {
  const fieldId = id ?? field;
  const inputName = name ?? field;

  const error = state?.ok === false ? state.error : null;
  const isInvalid = error ? hasFieldError(error, field) : false;

  const [value, setValue] = React.useState(() => defaultValue ?? '');

  React.useEffect(() => {
    if (!defaultValue) return;
    if (value) return;

    const existsInOptions = options.some((opt) => opt.value === defaultValue);
    if (existsInOptions) {
      setValue(defaultValue);
    }
  }, [defaultValue, options, value]);

  React.useEffect(() => {
    if (!forceValue) return;

    const exists = options.some((opt) => opt.value === forceValue);
    if (!exists) return;

    setValue(forceValue);
  }, [forceValue, options]);

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
        <div className="flex-1">
          <Select value={value} onValueChange={setValue} {...selectProps}>
            <SelectTrigger
              id={fieldId}
              aria-invalid={isInvalid || undefined}
              className="w-full"
              {...triggerProps}
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>

            <SelectContent>
              {options.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <input
            type="hidden"
            name={inputName}
            value={value}
            required={required}
            aria-hidden="true"
          />
        </div>

        {inlineAddon ? <div className="shrink-0">{inlineAddon}</div> : null}
      </div>

      <div className="min-h-[1rem]">
        <FieldErrorFirst error={error} field={field} Component={FieldError} />
      </div>
    </Field>
  );
}
