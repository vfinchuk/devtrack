'use client';

import { useDialog } from '@/features/dialogs/use-dialog';
import { IconButton } from '@/shared/ui/icon-button';
import { Company } from '@prisma/client';
import { Pencil } from 'lucide-react';

type Props = {
  company: Company;
};

export function EditCompanyButton({ company }: Props) {
  const { openDialog } = useDialog();

  return (
    <IconButton
      size="sm"
      variant="outline"
      icon={<Pencil />}
      onClick={() =>
        openDialog('edit-company', {
          company,
          title: 'Edit Company',
          description: 'Update company details.',
        })
      }
    />
  );
}
