'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import clsx from 'clsx';
import * as React from 'react';

export interface BaseDialogProps {
  title?: string;
  description?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

interface Props extends BaseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children?: React.ReactNode;
}

const sizeToClass: Record<NonNullable<Props['size']>, string> = {
  sm: 'sm:max-w-sm',
  md: 'sm:max-w-md',
  lg: 'sm:max-w-lg',
  xl: 'sm:max-w-xl',
};

export function BaseDialog({
  open,
  onOpenChange,
  title,
  description,
  size = 'md',
  children,
}: Props) {
  const hasVisibleHeader = Boolean(title || description);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={clsx(sizeToClass[size])}>
        {hasVisibleHeader ? (
          <DialogHeader>
            {title && <DialogTitle>{title}</DialogTitle>}
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>
        ) : (
          <DialogTitle className="sr-only">Dialog</DialogTitle>
        )}

        {children}
      </DialogContent>
    </Dialog>
  );
}
