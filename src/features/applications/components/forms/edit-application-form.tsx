// src/features/applications/components/application-forms.tsx
'use client';

import type { Application, Company } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useActionState } from 'react';

import { ApplicationFormShell } from './application-form-shell';

import { UpdateApplicationState } from '@/types/application';
import { updateApplication } from '../../actions/update-application.action';

type EditApplicationFormProps = {
  application: Application;
  companies: Company[];
};

export function EditApplicationForm({ application }: EditApplicationFormProps) {
  const router = useRouter();

  const [state, formAction, pending] = useActionState<
    UpdateApplicationState,
    FormData
  >(async (_prev, formData) => {
    const res = await updateApplication(_prev, formData);
    if (res?.ok) {
      router.push('/applications');
      router.refresh();
    }
    return res;
  }, null);

  return (
    <>
      <input
        type="hidden"
        name="id"
        value={application.id}
        form="edit-application-form"
      />

      <ApplicationFormShell
        mode="edit"
        formId="edit-application-form"
        companies={[]}
        state={state}
        pending={pending}
        initial={application}
        onCancel={() => router.back()}
        submitLabel="Save changes"
        action={formAction}
      />
    </>
  );
}
