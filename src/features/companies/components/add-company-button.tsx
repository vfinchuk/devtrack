'use client';

import { Button } from '@/components/ui/button';
import * as React from 'react';
import { useCompanyDialogs } from '../dialogs/use-company-dialogs';

type AddCompanyButtonProps = {
  label?: string;
  startIcon?: React.ReactNode;
  variant?: React.ComponentProps<typeof Button>['variant'];
  size?: React.ComponentProps<typeof Button>['size'];
};

export function AddCompanyButton({
  label = 'Add new company',
  variant = 'default',
  size = 'default',
  startIcon,
}: AddCompanyButtonProps) {
  const { openCreateCompanyDialog } = useCompanyDialogs();

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      onClick={() => openCreateCompanyDialog()}
      startIcon={startIcon}
    >
      {label}
    </Button>
  );
}
