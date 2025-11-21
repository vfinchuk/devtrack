'use client';

import { IconButton } from '@/shared/ui/icon-button';
import { Company } from '@prisma/client';
import { Pencil, Trash2 } from 'lucide-react';
import { useCompanyDialogs } from '../dialogs/use-company-dialogs';

interface CompaniesTableActionsProps {
  company: Company;
}

export function CompaniesTableActions({ company }: CompaniesTableActionsProps) {
  const { openEditCompanyDialog, openDeleteCompanyDialog } =
    useCompanyDialogs();

  return (
    <div className="flex justify-end gap-2">
      <IconButton
        size="sm"
        variant="outline"
        icon={<Pencil />}
        onClick={() => openEditCompanyDialog({ company })}
      />
      <IconButton
        size="sm"
        variant="destructive"
        icon={<Trash2 />}
        onClick={() => openDeleteCompanyDialog({ company })}
      />
    </div>
  );
}
