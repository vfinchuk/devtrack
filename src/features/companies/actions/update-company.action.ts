'use server';

import { ConflictError } from '@/core/errors';
import { fieldErrors, formError, ok } from '@/core/result';
import { requireUserId } from '@/features/auth/server/require-user';
import { ROUTES } from '@/shared/config/routes.config';
import type { UpdateCompanyField, UpdateCompanyState } from '@/types/companies';
import { revalidatePath } from 'next/cache';
import {
  UpdateCompanyDTO,
  updateCompanySchema,
} from '../schemas/update-company.schema';
import { updateCompanyRaw } from '../services/companies.service';

export async function updateCompany(
  _prev: UpdateCompanyState,
  formData: FormData,
) {
  const userId = await requireUserId();

  const id = String(formData.get('id') ?? '').trim();

  if (!id) {
    return formError(
      'Invalid company id. Please reload the page and try again.',
    );
  }
  const parsed = updateCompanySchema.safeParse({
    id,
    name: String(formData.get('name') ?? '').trim(),
    website: String(formData.get('website') ?? '').trim(),
    location: String(formData.get('location') ?? '').trim(),
  });

  if (!parsed.success) {
    const fe = parsed.error.flatten().fieldErrors;
    return fieldErrors<UpdateCompanyField>({
      name: fe.name,
      website: fe.website,
      location: fe.location,
    });
  }

  const dto: UpdateCompanyDTO = parsed.data;
  const res = await updateCompanyRaw(userId, dto);

  if (!res.ok) {
    if (res.error instanceof ConflictError) {
      return fieldErrors<UpdateCompanyField>({
        name: ['Company name already exists'],
      });
    }

    return formError('Could not update company. Please try again.');
  }

  revalidatePath(ROUTES.COMPANIES);
  return ok({ id: res.value.id });
}
