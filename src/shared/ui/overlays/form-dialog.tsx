'use client';

import { Button } from '@/components/ui/button';
import { LoadingButton } from '@/shared/ui/loading-button';
import * as React from 'react';

export interface FormDialogProps {
  formId: string;
  submitLabel?: string;
  cancelLabel?: string;
  isSubmitting?: boolean;
  onCancel?: () => void;
  children: React.ReactNode;
}

export function FormDialog({
  formId,
  children,
  submitLabel = 'Save',
  cancelLabel = 'Cancel',
  isSubmitting = false,
  onCancel,
}: FormDialogProps) {
  return (
    <div className="space-y-6">
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
