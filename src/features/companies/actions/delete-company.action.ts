'use server';

import { fieldErrors, formError, ok } from '@/core/result';
import { requireUserId } from '@/features/auth/server/require-user';
import { ROUTES } from '@/shared/config/routes.config';
import type { DeleteCompanyField } from '@/types/companies';
import { revalidatePath } from 'next/cache';
import { deleteCompanySchema } from '../schemas/company.schema';
import { deleteCompanyRaw } from '../services/companies.service';

export async function deleteCompany(id: string) {
  const userId = await requireUserId();

  const parsed = deleteCompanySchema.safeParse({
    id: id.trim(),
  });

  if (!parsed.success) {
    const fe = parsed.error.flatten().fieldErrors;
    return fieldErrors<DeleteCompanyField>({
      id: fe.id,
    });
  }

  const res = await deleteCompanyRaw(userId, parsed.data.id);

  if (!res.ok) {
    return formError('Could not delete company. Please try again.');
  }

  revalidatePath(ROUTES.COMPANIES);
  return ok({ id: res.value.id });
}
