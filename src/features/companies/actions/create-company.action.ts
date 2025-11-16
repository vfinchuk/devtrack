'use server';

import { ConflictError } from '@/core/errors';
import { fieldErrors, formError, ok } from '@/core/result';
import { requireUserId } from '@/features/auth/server/require-user';
import { ROUTES } from '@/shared/config/routes.config';
import { CreateCompanyField, CreateCompanyState } from '@/types/companies';
import { revalidatePath } from 'next/cache';
import {
  CreateCompanyDTO,
  createCompanySchema,
} from '../schemas/create-company.schema';
import { createCompanyRaw } from '../services/companies.service';

export async function createCompany(
  _prev: CreateCompanyState,
  formData: FormData,
) {
  const userId = await requireUserId();

  const parsed = createCompanySchema.safeParse({
    name: String(formData.get('name') ?? '').trim(),
    website: String(formData.get('website') ?? '').trim(),
    location: String(formData.get('location') ?? '').trim(),
  });

  if (!parsed.success) {
    const fe = parsed.error.flatten().fieldErrors;
    return fieldErrors<CreateCompanyField>({
      name: fe.name,
      website: fe.website,
      location: fe.location,
    });
  }

  const dto: CreateCompanyDTO = parsed.data;
  const res = await createCompanyRaw(userId, dto);

  if (!res.ok) {
    if (res.error instanceof ConflictError) {
      return fieldErrors<CreateCompanyField>({
        name: ['Company name already exists'],
      });
    }

    return formError('Could not create company. Please try again.');
  }

  revalidatePath(ROUTES.COMPANIES);
  return ok({ id: res.value.id });
}
