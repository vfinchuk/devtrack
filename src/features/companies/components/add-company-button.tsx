'use client';

import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useCompanyDialogs } from '../dialogs/use-company-dialogs';

export function AddCompanyButton() {
  const { openCreateCompanyDialog } = useCompanyDialogs();
  return (
    <Button
      type="button"
      onClick={() => openCreateCompanyDialog()}
      startIcon={<Plus />}
    >
      Add new company
    </Button>
  );
}
