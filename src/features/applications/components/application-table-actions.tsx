'use client';

import { ROUTES } from '@/shared/config/routes.config';
import { IconButton } from '@/shared/ui/icon-button';
import { Application } from '@prisma/client';
import { Pencil, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useApplicationDialogs } from '../dialogs/use-application-dialogs';

interface ApplicationTableActionsProps {
  application: Application;
}

const ApplicationTableActions = ({
  application,
}: ApplicationTableActionsProps) => {
  const { openDeleteApplicationDialog } = useApplicationDialogs();

  return (
    <div className="flex justify-end gap-2">
      <Link href={`${ROUTES.APPLICATIONS}/${application.id}/edit`}>
        <IconButton size="sm" icon={<Pencil />} />
      </Link>

      <IconButton
        size="sm"
        variant="destructive"
        icon={<Trash2 />}
        onClick={() => openDeleteApplicationDialog({ application })}
      />
    </div>
  );
};

export default ApplicationTableActions;
