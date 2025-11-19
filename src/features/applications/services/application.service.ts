import { InternalError } from '@/core/errors';
import { err, ok, Result } from '@/core/result';
import { prisma } from '@/server/db/prisma';
import {
  ApplicationStatus,
  Currency,
  EmploymentType,
  Prisma,
  Seniority,
} from '@prisma/client';

import {
  CreateApplicationDTO,
  DeleteApplicationDTO,
  UpdateApplicationDTO,
} from '../schemas/application.schema';

export type ApplicationWithRelations = Prisma.ApplicationGetPayload<{
  include: {
    company: true;
    interviews: true;
    notes: true;
    attachments: true;
  };
}>;

export async function getApplicationsByUser(
  userId: string,
  options: {
    status?: ApplicationStatus;
    includeArchived?: boolean;
  } = {},
): Promise<ApplicationWithRelations[]> {
  const { status, includeArchived = false } = options;

  return prisma.application.findMany({
    where: {
      userId,
      ...(includeArchived ? {} : { archived: false }),
      ...(status ? { status } : {}),
    },
    include: {
      company: true,
      interviews: true,
      notes: true,
      attachments: true,
    },
    orderBy: [{ archived: 'asc' }, { lastActivityAt: 'desc' }],
  });
}

export async function getApplicationById(
  userId: string,
  id: string,
): Promise<ApplicationWithRelations | null> {
  return prisma.application.findFirst({
    where: { id, userId },
    include: {
      company: true,
      interviews: true,
      notes: true,
      attachments: true,
    },
  });
}

/* -------------------- CREATE -------------------- */

export async function createApplicationRaw(
  userId: string,
  dto: CreateApplicationDTO,
): Promise<Result<{ id: string }, InternalError>> {
  try {
    const created = await prisma.application.create({
      data: {
        userId,
        companyId: dto.companyId,
        role: dto.role,

        status: dto.status ?? ApplicationStatus.APPLIED,
        seniority: dto.seniority ?? Seniority.MIDDLE,
        employmentType: dto.employmentType ?? EmploymentType.B2B,

        source: dto.source ?? null,
        sourceUrl: dto.sourceUrl ?? null,

        salaryMin: dto.salaryMin ?? null,
        salaryMax: dto.salaryMax ?? null,
        currency: dto.currency ?? Currency.EUR,
        compensationNote: dto.compensationNote ?? null,

        ...(dto.appliedAt ? { appliedAt: dto.appliedAt } : {}),
        ...(dto.lastActivityAt ? { lastActivityAt: dto.lastActivityAt } : {}),

        archived: dto.archived ?? false,
      },
      select: { id: true },
    });

    return ok(created);
  } catch (e) {
    return err(new InternalError('Failed to create application', e));
  }
}

/* -------------------- UPDATE -------------------- */

export async function updateApplicationRaw(
  userId: string,
  dto: UpdateApplicationDTO,
): Promise<Result<{ id: string }, InternalError>> {
  const { id, ...rest } = dto;

  try {
    const updated = await prisma.application.update({
      where: { id, userId },
      data: {
        companyId: rest.companyId,
        role: rest.role,

        status: rest.status ?? ApplicationStatus.APPLIED,
        seniority: rest.seniority ?? Seniority.MIDDLE,
        employmentType: rest.employmentType ?? EmploymentType.B2B,

        source: rest.source ?? null,
        sourceUrl: rest.sourceUrl ?? null,

        salaryMin: rest.salaryMin ?? null,
        salaryMax: rest.salaryMax ?? null,
        currency: rest.currency ?? Currency.EUR,
        compensationNote: rest.compensationNote ?? null,

        ...(rest.appliedAt ? { appliedAt: rest.appliedAt } : {}),
        ...(rest.lastActivityAt ? { lastActivityAt: rest.lastActivityAt } : {}),

        archived: rest.archived ?? false,
      },
      select: { id: true },
    });

    return ok(updated);
  } catch (e) {
    return err(new InternalError('Failed to update application', e));
  }
}

/* -------------------- DELETE -------------------- */

export async function deleteApplicationRaw(
  userId: string,
  { id }: DeleteApplicationDTO,
): Promise<Result<{ id: string }, InternalError>> {
  try {
    const deleted = await prisma.application.delete({
      where: { id, userId },
      select: { id: true },
    });

    return ok(deleted);
  } catch (e) {
    return err(new InternalError('Failed to delete application', e));
  }
}

/* -------------------- ARCHIVE / UNARCHIVE -------------------- */

export async function setApplicationArchivedRaw(
  userId: string,
  id: string,
  archived: boolean,
): Promise<Result<{ id: string }, InternalError>> {
  try {
    const updated = await prisma.application.update({
      where: { id, userId },
      data: {
        archived,
        lastActivityAt: new Date(),
      },
      select: { id: true },
    });

    return ok(updated);
  } catch (e) {
    return err(new InternalError('Failed to archive application', e));
  }
}
