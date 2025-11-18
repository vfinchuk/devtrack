'use client';

import { Button } from '@/components/ui/button';
import { useDialog } from '@/features/dialogs/use-dialog';
import clsx from 'clsx';
import * as React from 'react';
import { LoadingButton } from '../loading-button';

export type ConfirmDialogVariant = 'default' | 'destructive';

export interface ConfirmDialogProps {
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: ConfirmDialogVariant;
  isSubmitting?: boolean;
  onConfirm?: () => void | Promise<void>;
  onCancel?: () => void;
}

export function ConfirmDialog({
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'default',
  isSubmitting = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const { closeDialog } = useDialog();
  const [submitting, setSubmitting] = React.useState(false);

  async function handleConfirm() {
    if (!onConfirm) return;
    try {
      setSubmitting(true);
      await onConfirm();
    } finally {
      setSubmitting(false);
    }
  }

  function handleCancel() {
    if (onCancel) {
      onCancel();
      return;
    }
    closeDialog();
  }

  const disabled = isSubmitting || submitting;

  return (
    <div className="space-y-4">
      <div className="flex justify-end gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={handleCancel}
          disabled={disabled}
        >
          {cancelLabel}
        </Button>

        <LoadingButton
          type="button"
          onClick={handleConfirm}
          isLoading={disabled}
          className={clsx(
            variant === 'destructive' &&
              'bg-destructive hover:bg-destructive/90',
          )}
        >
          {confirmLabel}
        </LoadingButton>
      </div>
    </div>
  );
}
