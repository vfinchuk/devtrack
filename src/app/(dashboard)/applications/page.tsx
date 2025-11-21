import { Button } from '@/components/ui/button';
import { ApplicationsTable } from '@/features/applications/components/applications-table';
import { getApplications } from '@/features/applications/queries';
import { requireUserId } from '@/features/auth/server/require-user';
import { routes } from '@/shared/config/routes.config';
import { Plus } from 'lucide-react';
import Link from 'next/link';

export default async function ApplicationsPage() {
  const userId = await requireUserId();
  const applications = await getApplications(userId);

  return (
    <section className="flex h-full flex-col space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Applications</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Track your job applications across companies and roles.
          </p>
        </div>

        <Button asChild>
          <Link
            href={routes.applications.new}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Create new Application
          </Link>
        </Button>
      </div>

      <ApplicationsTable applications={applications} />
    </section>
  );
}
