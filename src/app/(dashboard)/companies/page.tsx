import { requireUserId } from '@/features/auth/server/require-user';
import { CompaniesTable } from '@/features/companies/components/companies-table';
import { getCompanies } from '@/features/companies/queries';

export default async function CompaniesPage() {
  const userId = await requireUserId();
  const companies = await getCompanies(userId);

  return <CompaniesTable companies={companies} />;
}
