'use server';

import { fieldErrors, formError, InternalError } from '@/core';
import { requireUserId } from '@/features/auth/server/require-user';
import { ROUTES } from '@/shared/config/routes.config';
import { getRequiredText } from '@/shared/utils/form-utils';
import {
  DeleteApplicationField,
  DeleteApplicationState,
} from '@/types/application';
import { ok } from 'assert';
import { revalidatePath } from 'next/cache';
import {
  DeleteApplicationDTO,
  DeleteApplicationSchema,
} from '../schemas/application.schema';
import { deleteApplicationRaw } from '../services/application.service';

export async function deleteApplication(
  _prev: DeleteApplicationState,
  formData: FormData,
) {
  const userId = await requireUserId();

  const id = getRequiredText(formData, 'id');

  const parsed = DeleteApplicationSchema.safeParse({ id });

  if (!parsed.success) {
    const fe = parsed.error.flatten().fieldErrors;

    return fieldErrors<DeleteApplicationField>({
      id: fe.id,
    });
  }

  const dto: DeleteApplicationDTO = parsed.data;
  const res = await deleteApplicationRaw(userId, dto);

  if (!res.ok) {
    if (res.error instanceof InternalError) {
      return formError('Could not delete application. Please try again.');
    }

    return formError('Unexpected error. Please try again.');
  }

  revalidatePath(ROUTES.APPLICATIONS);
  return ok({ id: res.value.id });
}
