'use client';

import { deleteCompany } from '@/features/companies/actions/delete-company.action';
import { useDialog } from '@/features/dialogs/use-dialog';
import { IconButton } from '@/shared/ui/icon-button';
import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Props {
  id: string;
  role: string;
}

export function DeleteApplicationButton({ id, role }: Props) {
  const router = useRouter();
  const { openDialog, closeDialog } = useDialog();

  return (
    <IconButton
      variant="destructive"
      icon={<Trash2 />}
      onClick={() => {
        openDialog('confirm', {
          title: 'Delete application',
          description: `Are you sure you want to delete "${role}" application?`,
          confirmLabel: 'Delete',
          variant: 'destructive',
          onConfirm: async () => {
            await deleteCompany(id);
            router.refresh();
            closeDialog();
          },
        });
      }}
    />
  );
}
