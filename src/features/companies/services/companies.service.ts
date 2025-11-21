import { ConflictError, InternalError } from '@/core/errors';
import { err, ok, Result } from '@/core/result';
import { prisma } from '@/server/db/prisma';
import { Company, Prisma } from '@prisma/client';
import { CreateCompanyDTO, UpdateCompanyDTO } from '../schemas/company.schema';

export type CompanyWithRelations = Prisma.CompanyGetPayload<{
  include: {
    applications: true;
  };
}>;

export async function getCompaniesRaw(userId: string): Promise<Company[]> {
  return prisma.company.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });
}

export async function getCompaniesWithRelationsRaw(
  userId: string,
): Promise<CompanyWithRelations[]> {
  return prisma.company.findMany({
    where: { userId },
    orderBy: {
      applications: {
        _count: 'desc',
      },
    },
    include: {
      applications: true,
      _count: {
        select: {
          applications: true,
        },
      },
    },
  });
}

export async function createCompanyRaw(
  userId: string,
  dto: CreateCompanyDTO,
): Promise<
  Result<{ id: string; name: string }, ConflictError | InternalError>
> {
  try {
    const created = await prisma.company.create({
      data: { userId, ...dto },
      select: { id: true, name: true },
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
  userId: string,
  { id, name }: UpdateCompanyDTO,
): Promise<Result<{ id: string }, ConflictError | InternalError>> {
  try {
    const updated = await prisma.company.update({
      where: { id, userId },
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
  userId: string,
  id: string,
): Promise<Result<{ id: string }, InternalError>> {
  try {
    const deleted = await prisma.company.delete({
      where: { id, userId },
      select: { id: true },
    });
    return ok(deleted);
  } catch (e) {
    return err(new InternalError('Failed to delete company', e));
  }
}
