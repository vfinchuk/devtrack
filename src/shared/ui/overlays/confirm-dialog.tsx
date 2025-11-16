'use client';

import { Button } from '@/components/ui/button';
import { useDialog } from '@/features/dialogs/use-dialog';
import clsx from 'clsx';
import * as React from 'react';
import { LoadingButton } from '../loading-button';

export type ConfirmDialogVariant = 'default' | 'destructive';

export type ConfirmDialogProps = {
  title?: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: ConfirmDialogVariant;
  isSubmitting?: boolean;
  onConfirm?: () => void | Promise<void>;
  onCancel?: () => void;
};

export function ConfirmDialog({
  title = 'Are you sure?',
  description,
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
      onCancel?.();
      return;
    }

    closeDialog();
  }

  return (
    <div className="space-y-4">
      {(title || description) && (
        <div className="space-y-1">
          {title && (
            <h2 className="text-lg font-semibold leading-none tracking-tight">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      )}

      <div className="flex justify-end gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={handleCancel}
          disabled={isSubmitting || submitting}
        >
          {cancelLabel}
        </Button>

        <LoadingButton
          type="button"
          onClick={handleConfirm}
          isLoading={isSubmitting || submitting}
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
