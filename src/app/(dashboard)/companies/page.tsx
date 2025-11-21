import { requireUserId } from '@/features/auth/server/require-user';
import { CompaniesTable } from '@/features/companies/components/companies-table';
import { getCompaniesWithRelations } from '@/features/companies/queries';

export default async function CompaniesPage() {
  const userId = await requireUserId();
  const companies = await getCompaniesWithRelations(userId);

  return <CompaniesTable companies={companies} />;
}
