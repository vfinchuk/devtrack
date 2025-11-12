'use server';

import { ConflictError } from '@/core/errors';
import { fieldErrors, formError, ok } from '@/core/result';
import { requireUserId } from '@/features/auth/server/require-user';
import { ROUTES } from '@/shared/config/routes.config';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { createCompanyRaw } from '../services/companies.service';

const schema = z.object({
  name: z.string().min(1, 'Name is required').max(200, 'Name is too long'),
});

export async function createCompany(_prev: unknown, fd: FormData) {
  const userId = await requireUserId();

  const parsed = schema.safeParse({
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
