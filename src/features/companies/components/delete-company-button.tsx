'use client';

import { Button } from '@/components/ui/button';
import { wait } from '@/core';
import { useDialog } from '@/features/dialogs/use-dialog';

type Props = { companyId: string; companyName: string };

export function DeleteCompanyButton({ companyId, companyName }: Props) {
  const { openDialog, closeDialog } = useDialog();

  const handleClick = () => {
    openDialog({
      id: 'confirm',
      props: {
        title: 'Delete company',
        description: `Are you sure you want to delete "${companyName}"? This action cannot be undone.`,
        confirmLabel: 'Delete',
        cancelLabel: 'Cancel',
        variant: 'destructive',
        onConfirm: async () => {
          // await deleteCompany(companyId);
          await wait(3000);
          closeDialog();
        },
        onCancel: () => {
          closeDialog();
        },
      },
    });
  };

  return (
    <Button variant="destructive" size="sm" onClick={handleClick}>
      Delete
    </Button>
  );
}
