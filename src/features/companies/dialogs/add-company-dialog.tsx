'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { closeDialog } from '@/features/dialogs/dialog.slice';
import { hasFieldError } from '@/shared/forms/errors';
import { FieldErrorFirst } from '@/shared/forms/form-errors';
import { FieldError } from '@/shared/ui/form/field';
import { Form } from '@/shared/ui/form/form';
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
    <Form<CreateCompanyField, CreateCompanyState>
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
