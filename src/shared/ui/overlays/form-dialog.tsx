'use client';

import { Button } from '@/components/ui/button';
import { LoadingButton } from '@/shared/ui/loading-button';
import * as React from 'react';

export type FormDialogProps = {
  title?: string;
  description?: string;
  children: React.ReactNode;
  formId: string;
  submitLabel?: string;
  cancelLabel?: string;
  isSubmitting?: boolean;
  onCancel?: () => void;
};

export function FormDialog({
  title,
  description,
  children,
  formId,
  submitLabel = 'Save',
  cancelLabel = 'Cancel',
  isSubmitting = false,
  onCancel,
}: FormDialogProps) {
  return (
    <div className="space-y-6">
      {(title || description) && (
        <div className="space-y-2">
          {title && <h2 className="text-lg font-semibold">{title}</h2>}
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      )}

      <div className="space-y-4">{children}</div>

      <div className="flex justify-end gap-2 pt-2">
        <Button
          type="button"
          variant="outline"
          disabled={isSubmitting}
          onClick={onCancel}
        >
          {cancelLabel}
        </Button>

        <LoadingButton type="submit" form={formId} isLoading={isSubmitting}>
          {submitLabel}
        </LoadingButton>
      </div>
    </div>
  );
}
