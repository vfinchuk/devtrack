import { CreateApplicationForm } from '@/features/applications/components/forms/create-application-form';
import { requireUserId } from '@/features/auth/server/require-user';
import { getCompanies } from '@/features/companies/queries';

export default async function NewApplicationPage() {
  const userId = await requireUserId();
  const companies = await getCompanies(userId);

  return <CreateApplicationForm companies={companies} />;
}
