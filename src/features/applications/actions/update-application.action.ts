'use server';

import { fieldErrors, formError, InternalError, ok } from '@/core';
import { requireUserId } from '@/features/auth/server/require-user';
import { ROUTES } from '@/shared/config/routes.config';
import {
  getBool,
  getDate,
  getEnum,
  getNumber,
  getRequiredText,
  getText,
} from '@/shared/utils/form-utils';
import {
  UpdateApplicationField,
  UpdateApplicationState,
} from '@/types/application';
import { revalidatePath } from 'next/cache';
import {
  UpdateApplicationDTO,
  UpdateApplicationSchema,
} from '../schemas/application.schema';
import { updateApplicationRaw } from '../services/application.service';

export async function updateApplication(
  _prev: UpdateApplicationState,
  formData: FormData,
) {
  const userId = await requireUserId();

  const id = getRequiredText(formData, 'id');
  if (!id) {
    return formError(
      'Invalid application id. Please reload the page and try again.',
    );
  }

  const parsed = UpdateApplicationSchema.safeParse({
    id,
    companyId: getRequiredText(formData, 'companyId'),
    role: getRequiredText(formData, 'role'),

    status: getEnum(formData, 'status'),
    seniority: getEnum(formData, 'seniority'),
    employmentType: getEnum(formData, 'employmentType'),

    source: getEnum(formData, 'source'),
    sourceUrl: getText(formData, 'sourceUrl'),

    salaryMin: getNumber(formData, 'salaryMin'),
    salaryMax: getNumber(formData, 'salaryMax'),

    currency: getEnum(formData, 'currency'),
    compensationNote: getText(formData, 'compensationNote'),

    appliedAt: getDate(formData, 'appliedAt'),
    lastActivityAt: getDate(formData, 'lastActivityAt'),

    archived: getBool(formData, 'archived'),
  });

  if (!parsed.success) {
    const fe = parsed.error.flatten().fieldErrors;

    return fieldErrors<UpdateApplicationField>({
      id: fe.id,
      companyId: fe.companyId,
      role: fe.role,
      status: fe.status,
      seniority: fe.seniority,
      employmentType: fe.employmentType,
      source: fe.source,
      sourceUrl: fe.sourceUrl,
      salaryMin: fe.salaryMin,
      salaryMax: fe.salaryMax,
      currency: fe.currency,
      compensationNote: fe.compensationNote,
      appliedAt: fe.appliedAt,
      lastActivityAt: fe.lastActivityAt,
      archived: fe.archived,
    });
  }

  const dto: UpdateApplicationDTO = parsed.data;
  const res = await updateApplicationRaw(userId, dto);

  if (!res.ok) {
    if (res.error instanceof InternalError) {
      return formError('Could not update application. Please try again.');
    }

    return formError('Unexpected error. Please try again.');
  }

  revalidatePath(ROUTES.APPLICATIONS);
  return ok({ id: res.value.id });
}
