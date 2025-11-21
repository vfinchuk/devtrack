'use server';

import { InternalError } from '@/core/errors';
import { err, ok, Result } from '@/core/result';
import { requireUserId } from '@/features/auth/server/require-user';
import { routes } from '@/shared/config/routes.config';
import { revalidatePath } from 'next/cache';

import {
  DeleteApplicationDTO,
  DeleteApplicationSchema,
} from '../schemas/application.schema';
import { deleteApplicationRaw } from '../services/application.service';

export async function deleteApplication(
  id: string,
): Promise<Result<{ id: string }, InternalError>> {
  const userId = await requireUserId();

  const parsed = DeleteApplicationSchema.safeParse({ id });

  if (!parsed.success) {
    return err(new InternalError('Invalid application id'));
  }

  const dto: DeleteApplicationDTO = parsed.data;
  const res = await deleteApplicationRaw(userId, dto);

  if (!res.ok) {
    return err(res.error);
  }

  revalidatePath(routes.applications.root);
  return ok({ id: res.value.id });
}
