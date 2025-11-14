'use client';

import { closeDialog } from '@/features/dialogs/dialog.slice';
import { hasFieldError } from '@/shared/forms/errors';
import { FieldErrorFirst, GlobalFormError } from '@/shared/forms/form-errors';
import { Button } from '@/shared/ui/button';
import { FieldError } from '@/shared/ui/field';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { useAppDispatch } from '@/store/hooks';
import type { CreateCompanyState } from '@/types/companies';
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
  >(async (prev, formData) => {
    const res = await createCompany(prev, formData);
    if (res?.ok) {
      router.refresh();
      dispatch(closeDialog());
    }
    return res;
  }, null);

  const isInvalid = !state?.ok && hasFieldError(state?.error, 'name');

  return (
    <form action={formAction} className="space-y-4" noValidate>
      {!state?.ok && state?.error && (
        <GlobalFormError
          error={state.error}
          Component={({ children }) => (
            <p role="status" className="text-sm text-destructive">
              {children}
            </p>
          )}
        />
      )}

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
    </form>
  );
}
