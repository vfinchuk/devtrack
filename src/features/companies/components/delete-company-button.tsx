'use client';

import { useDialog } from '@/features/dialogs/use-dialog';
import { IconButton } from '@/shared/ui/icon-button';
import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

type Props = {
  id: string;
  name: string;
};

export function DeleteCompanyButton({ id, name }: Props) {
  const router = useRouter();
  const { openDialog, closeDialog } = useDialog();

  return (
    <IconButton
      size="sm"
      variant="destructive"
      icon={<Trash2 />}
      onClick={() => {
        openDialog('confirm', {
          title: 'Delete company',
          description: `Are you sure you want to delete "${name}"?`,
          confirmLabel: 'Delete',
          variant: 'destructive',
          onConfirm: async () => {
            // await deleteCompany(id);
            router.refresh();
            closeDialog();
          },
        });
      }}
    />
  );
}
