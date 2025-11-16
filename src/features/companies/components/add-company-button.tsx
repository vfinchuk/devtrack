'use client';

import { Button } from '@/components/ui/button';
import { useDialog } from '@/features/dialogs/use-dialog';
import { Plus } from 'lucide-react';

export function AddCompanyButton() {
  const { openDialog } = useDialog();

  return (
    <Button
      type="button"
      onClick={() => openDialog({ id: 'add-company' })}
      className="gap-2"
    >
      <Plus className="h-4 w-4" />
      Add new company
    </Button>
  );
}
