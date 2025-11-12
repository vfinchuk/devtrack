import { prisma } from '@/server/db/prisma';
import 'server-only';

export async function getCompaniesByOwner(ownerId: string) {
  return prisma.company.findMany({
    where: { ownerId },
    orderBy: { createdAt: 'desc' },
  });
}

export async function createCompanyRaw(ownerId: string, name: string) {
  return prisma.company.create({
    data: { ownerId, name },
  });
}

export async function updateCompanyRaw(
  ownerId: string,
  id: string,
  name: string,
) {
  return prisma.company.update({
    where: { id, ownerId },
    data: { name },
  });
}

export async function deleteCompanyRaw(ownerId: string, id: string) {
  return prisma.company.delete({
    where: { id, ownerId },
  });
}
