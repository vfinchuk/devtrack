import { ConflictError, InternalError } from '@/core/errors';
import { err, ok, Result } from '@/core/result';
import { prisma } from '@/server/db/prisma';
import { Prisma } from '@prisma/client';
import { CreateCompanyDTO } from '../schemas/create-company.schema';

export async function getCompaniesByOwner(ownerId: string) {
  return prisma.company.findMany({
    where: { ownerId },
    orderBy: { createdAt: 'desc' },
  });
}

export async function createCompanyRaw(
  ownerId: string,
  dto: CreateCompanyDTO,
): Promise<Result<{ id: string }, ConflictError | InternalError>> {
  try {
    const created = await prisma.company.create({
      data: { ownerId, ...dto },
      select: { id: true },
    });
    return ok(created);
  } catch (e) {
    if (
      e instanceof Prisma.PrismaClientKnownRequestError &&
      e.code === 'P2002'
    ) {
      return err(new ConflictError('Company name already exists', e));
    }
    return err(new InternalError('Failed to create company', e));
  }
}

export async function updateCompanyRaw(
  ownerId: string,
  id: string,
  name: string,
): Promise<Result<{ id: string }, ConflictError | InternalError>> {
  try {
    const updated = await prisma.company.update({
      where: { id, ownerId },
      data: { name },
      select: { id: true },
    });
    return ok(updated);
  } catch (e) {
    if (
      e instanceof Prisma.PrismaClientKnownRequestError &&
      e.code === 'P2002'
    ) {
      return err(new ConflictError('Company name already exists', e));
    }
    return err(new InternalError('Failed to update company', e));
  }
}

export async function deleteCompanyRaw(
  ownerId: string,
  id: string,
): Promise<Result<{ id: string }, InternalError>> {
  try {
    const deleted = await prisma.company.delete({
      where: { id, ownerId },
      select: { id: true },
    });
    return ok(deleted);
  } catch (e) {
    return err(new InternalError('Failed to delete company', e));
  }
}
