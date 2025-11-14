'use server';

import { ConflictError } from '@/core/errors';
import { fieldErrors, formError, ok } from '@/core/result';
import { requireUserId } from '@/features/auth/server/require-user';
import { ROUTES } from '@/shared/config/routes.config';
import { revalidatePath } from 'next/cache';
import { createCompanySchema } from '../schemas/create-company.schema';
import { createCompanyRaw } from '../services/companies.service';

export async function createCompany(_prev: unknown, fd: FormData) {
  const userId = await requireUserId();

  const parsed = createCompanySchema.safeParse({
    name: String(fd.get('name') ?? '').trim(),
  });

  if (!parsed.success) {
    const fe = parsed.error.flatten().fieldErrors;
    return fieldErrors<'name'>({ name: fe.name });
  }

  const res = await createCompanyRaw(userId, parsed.data.name);

  if (!res.ok) {
    if (res.error instanceof ConflictError) {
      return fieldErrors<'name'>({ name: ['Company name already exists'] });
    }

    return formError('Could not create company. Please try again.');
  }

  revalidatePath(ROUTES.COMPANIES);
  return ok({ id: res.value.id });
}
