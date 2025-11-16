'use client';

import { useDialog } from '@/features/dialogs/use-dialog';
import { IconButton } from '@/shared/ui/icon-button';
import { Pencil } from 'lucide-react';

type Props = {
  id: string;
  name: string;
};

export function EditCompanyButton({ id, name }: Props) {
  const { openDialog } = useDialog();

  return (
    <IconButton
      size="sm"
      variant="outline"
      icon={<Pencil />}
      onClick={() =>
        openDialog({
          id: 'edit-company',
          props: { companyId: id, defaultName: name },
        })
      }
    />
  );
}
