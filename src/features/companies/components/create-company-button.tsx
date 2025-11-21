'use client';

import { Button } from '@/components/ui/button';
import * as React from 'react';
import { useCompanyDialogs } from '../dialogs/use-company-dialogs';

type CreateCompanyButtonProps = {
  startIcon?: React.ReactNode;
  variant?: React.ComponentProps<typeof Button>['variant'];
  size?: React.ComponentProps<typeof Button>['size'];
  className?: React.ComponentProps<typeof Button>['className'];
  children?: React.ReactNode;
};

export function CreateCompanyButton({
  variant = 'default',
  size = 'default',
  startIcon,
  className,
  children,
}: CreateCompanyButtonProps) {
  const { openCreateCompanyDialog } = useCompanyDialogs();

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      onClick={() => openCreateCompanyDialog()}
      startIcon={startIcon}
      className={className}
    >
      {children ?? 'Create new Company'}
    </Button>
  );
}
