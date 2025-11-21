'use client';

import { isGlobalError } from '@/core';
import { routes } from '@/shared/config/routes.config';
import { notify } from '@/shared/lib/toast';
import { CreateApplicationState } from '@/types/application';
import {
  ApplicationSeniority,
  ApplicationStatus,
  Company,
  Currency,
  EmploymentType,
} from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useActionState } from 'react';
import { createApplication } from '../../actions/create-application.action';
import { ApplicationFormShell } from './application-form-shell';

interface CreateApplicationFormProps {
  companies: Company[];
}

export function CreateApplicationForm({
  companies,
}: CreateApplicationFormProps) {
  const router = useRouter();

  const [state, formAction, pending] = useActionState<
    CreateApplicationState,
    FormData
  >(async (_prev, formData) => {
    const res = await createApplication(_prev, formData);
    if (res?.ok) {
      notify.success(`Application "${res.value.role}" created successfully`);

      router.push(routes.applications.details(res.value.id));
      router.refresh();

      return res;
    }

    if (isGlobalError(res.error)) {
      notify.error(res.error.message);
    }

    return res;
  }, null);

  return (
    <ApplicationFormShell
      mode="create"
      formId="create-application-form"
      companies={companies}
      state={state}
      pending={pending}
      initial={{
        status: ApplicationStatus.APPLIED,
        seniority: ApplicationSeniority.MIDDLE,
        employmentType: EmploymentType.B2B,
        currency: Currency.EUR,
      }}
      onCancel={() => router.back()}
      submitLabel="Create"
      action={formAction}
    />
  );
}
