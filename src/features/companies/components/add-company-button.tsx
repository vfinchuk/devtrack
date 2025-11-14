'use client';

import { Button } from '@/components/ui/button';
import { useDialog } from '@/features/dialogs/use-dialog';

export function AddCompanyButton() {
  const { openDialog } = useDialog();
  return (
    <Button
      onClick={() =>
        openDialog({ id: 'add-company', props: { defaultName: '' } })
      }
    >
      Add company
    </Button>
  );
}
