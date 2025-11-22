import { Button } from '@/components/ui/button';
import { ApplicationsTable } from '@/features/applications/components/applications-table';
import { getApplications } from '@/features/applications/queries';
import { requireUserId } from '@/features/auth/server/require-user';
import { routes } from '@/shared/config/routes.config';
import { PageHeaderLayout } from '@/shared/ui/layout/page-header-layout';
import { Plus } from 'lucide-react';
import Link from 'next/link';

export default async function ApplicationsPage() {
  const userId = await requireUserId();
  const applications = await getApplications(userId);

  return (
    <PageHeaderLayout
      title="Applications"
      description="Track your job applications across companies and roles."
      action={
        <Button asChild>
          <Link
            href={routes.applications.new}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Create new Application
          </Link>
        </Button>
      }
    >
      <ApplicationsTable applications={applications} />
    </PageHeaderLayout>
  );
}
