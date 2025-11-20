import { ApplicationsTable } from '@/features/applications/components/applications-table';
import { getApplications } from '@/features/applications/queries';
import { requireUserId } from '@/features/auth/server/require-user';

export default async function ApplicationPage() {
  const userId = await requireUserId();
  const applications = await getApplications(userId);

  return <ApplicationsTable applications={applications} />;
}
