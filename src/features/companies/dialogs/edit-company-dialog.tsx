'use client';

import { useDialog } from '@/features/dialogs/use-dialog';
import { Form } from '@/shared/ui/form/form';
import { FormField } from '@/shared/ui/form/form-field';
import { FormDialog } from '@/shared/ui/overlays/form-dialog';
import type { UpdateCompanyField, UpdateCompanyState } from '@/types/companies';
import { useRouter } from 'next/navigation';
import { useActionState } from 'react';
import { updateCompany } from '../actions/update-company.action';

export type EditCompanyDialogProps = {
  companyId: string;
  defaultName?: string;
};

export function EditCompanyDialog({
  companyId,
  defaultName,
}: EditCompanyDialogProps) {
  const router = useRouter();
  const { closeDialog } = useDialog();

  const [state, formAction, pending] = useActionState<
    UpdateCompanyState,
    FormData
  >(async (prev, formData) => {
    formData.set('id', companyId);

    const res = await updateCompany(prev, formData);
    if (res?.ok) {
      router.refresh();
      closeDialog();
    }
    return res;
  }, null);

  return (
    <FormDialog
      title="Edit Company"
      description="Update company details."
      formId="edit-company-form"
      isSubmitting={pending}
      submitLabel="Save changes"
      cancelLabel="Cancel"
      onCancel={closeDialog}
    >
      <Form<UpdateCompanyField, UpdateCompanyState>
        id="edit-company-form"
        state={state}
        action={formAction}
        className="space-y-4"
      >
        <input type="hidden" name="id" value={companyId} />

        <FormField<UpdateCompanyField>
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
