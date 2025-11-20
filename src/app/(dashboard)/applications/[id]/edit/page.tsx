import { EditApplicationForm } from '@/features/applications/components/forms/edit-application-form';
import { getApplicationById } from '@/features/applications/services/application.service';
import { requireUserId } from '@/features/auth/server/require-user';
import { getCompanies } from '@/features/companies/queries';
import { notFound } from 'next/navigation';

type Props = {
  params: { id: string };
};

export default async function EditApplicationPage({ params }: Props) {
  const userId = await requireUserId();
  const companies = await getCompanies(userId);

  const application = await getApplicationById(userId, params.id);

  if (!application) {
    notFound();
  }

  return (
    <EditApplicationForm application={application} companies={companies} />
  );
}
