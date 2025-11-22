import { requireUserId } from '@/features/auth/server/require-user';
import { CompaniesTable } from '@/features/companies/components/companies-table';
import { CreateCompanyButton } from '@/features/companies/components/create-company-button';
import { getCompaniesWithRelations } from '@/features/companies/queries';
import { PageHeaderLayout } from '@/shared/ui/layout/page-header-layout';
import { Plus } from 'lucide-react';

export default async function CompaniesPage() {
  const userId = await requireUserId();
  const companies = await getCompaniesWithRelations(userId);

  return (
    <PageHeaderLayout
      title="Companies"
      description="Manage companies connected to your workspace."
      action={<CreateCompanyButton startIcon={<Plus />} />}
    >
      <CompaniesTable companies={companies} />
    </PageHeaderLayout>
  );
}
