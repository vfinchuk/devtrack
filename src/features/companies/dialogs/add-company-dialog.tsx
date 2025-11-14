'use client';

import { useDialog } from '@/features/dialogs/use-dialog';
import { Form } from '@/shared/ui/form/form';
import { FormField } from '@/shared/ui/form/form-field';
import { FormDialog } from '@/shared/ui/overlays/form-dialog';
import type { CreateCompanyField, CreateCompanyState } from '@/types/companies';
import { useRouter } from 'next/navigation';
import { useActionState } from 'react';
import { createCompany } from '../actions/create-company.action';

export type AddCompanyDialogProps = { defaultName?: string };

export function AddCompanyDialog({ defaultName }: AddCompanyDialogProps) {
  const router = useRouter();
  const { closeDialog } = useDialog();

  const [state, formAction, pending] = useActionState<
    CreateCompanyState,
    FormData
  >(async (_prev, formData) => {
    const res = await createCompany(_prev, formData);
    if (res?.ok) {
      router.refresh();
      closeDialog();
    }
    return res;
  }, null);

  return (
    <FormDialog
      title="Create Company"
      description="Add a new company to your workspace."
      formId="add-company-form"
      isSubmitting={pending}
      submitLabel="Create"
      cancelLabel="Cancel"
      onCancel={closeDialog}
    >
      <Form<CreateCompanyField, CreateCompanyState>
        id="add-company-form"
        state={state}
        action={formAction}
        className="space-y-4"
      >
        <FormField<CreateCompanyField>
          state={state}
          field="name"
          label="Name"
          placeholder="Acme Inc"
          required
          inputProps={{
            defaultValue: defaultName,
          }}
        />
      </Form>
    </FormDialog>
  );
}
