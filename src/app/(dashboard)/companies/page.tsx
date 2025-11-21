import { requireUserId } from '@/features/auth/server/require-user';
import { CompaniesTable } from '@/features/companies/components/companies-table';
import { CreateCompanyButton } from '@/features/companies/components/create-company-button';
import { getCompaniesWithRelations } from '@/features/companies/queries';
import { Plus } from 'lucide-react';

export default async function CompaniesPage() {
  const userId = await requireUserId();
  const companies = await getCompaniesWithRelations(userId);

  return (
    <section className="space-y-6 flex flex-col h-full">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Companies</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage companies connected to your workspace.
          </p>
        </div>

        <CreateCompanyButton startIcon={<Plus />} />
      </div>

      <CompaniesTable companies={companies} />
    </section>
  );
}
