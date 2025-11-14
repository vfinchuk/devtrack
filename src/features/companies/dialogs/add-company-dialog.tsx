'use client';

import { closeDialog } from '@/features/dialogs/dialog.slice';
import { hasFieldError } from '@/shared/forms/errors';
import { FieldErrorFirst } from '@/shared/forms/form-errors';
import { Button } from '@/shared/ui/button';
import { FieldError } from '@/shared/ui/field';
import { FormBase } from '@/shared/ui/form-base';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { useAppDispatch } from '@/store/hooks';
import type { CreateCompanyField, CreateCompanyState } from '@/types/companies';
import { useRouter } from 'next/navigation';
import { useActionState } from 'react';
import { createCompany } from '../actions/create-company.action';

export type AddCompanyDialogProps = { defaultName?: string };

export function AddCompanyDialog(props: AddCompanyDialogProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [state, formAction, pending] = useActionState<
    CreateCompanyState,
    FormData
  >(async (_prev, formData) => {
    const res = await createCompany(_prev, formData);
    if (res?.ok) {
      router.refresh();
      dispatch(closeDialog());
    }
    return res;
  }, null);

  const isInvalid = !state?.ok && hasFieldError(state?.error, 'name');

  return (
    <FormBase<CreateCompanyField, CreateCompanyState>
      state={state}
      action={formAction}
      className="space-y-4"
    >
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          defaultValue={props.defaultName}
          placeholder="Acme Inc"
          required
          aria-invalid={isInvalid || undefined}
        />
        <FieldErrorFirst
          error={state?.ok === false ? state.error : undefined}
          field="name"
          Component={FieldError}
        />
      </div>

      <div className="flex justify-end gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => dispatch(closeDialog())}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={pending}>
          {pending ? 'Creating…' : 'Create'}
        </Button>
      </div>
    </FormBase>
  );
}
