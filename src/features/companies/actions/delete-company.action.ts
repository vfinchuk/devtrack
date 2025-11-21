'use server';

import { InternalError } from '@/core/errors';
import { err, ok, Result } from '@/core/result';
import { requireUserId } from '@/features/auth/server/require-user';
import { ROUTES } from '@/shared/config/routes.config';
import { revalidatePath } from 'next/cache';
import { DeleteCompanySchema } from '../schemas/company.schema';
import { deleteCompanyRaw } from '../services/companies.service';

export async function deleteCompany(
  id: string,
): Promise<Result<{ id: string }, InternalError>> {
  const userId = await requireUserId();

  const parsed = DeleteCompanySchema.safeParse({ id });

  if (!parsed.success) {
    return err(new InternalError('Invalid company id'));
  }

  const res = await deleteCompanyRaw(userId, parsed.data.id);

  if (!res.ok) {
    return err(res.error);
  }

  revalidatePath(ROUTES.COMPANIES);

  return ok({ id: res.value.id });
}
