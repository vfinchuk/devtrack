'use client';

import { Button } from '@/components/ui/button';

export type ErrorDialogProps = {
  title?: string;
  message?: string;
  onClose?: () => void;
};

export function ErrorDialog({
  title = 'Something went wrong',
  message = 'An unexpected error occurred. Please try again.',
  onClose,
}: ErrorDialogProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-destructive">{title}</h2>

        {message && (
          <p className="text-sm text-muted-foreground whitespace-pre-line">
            {message}
          </p>
        )}
      </div>

      <div className="flex justify-end pt-2">
        <Button variant="destructive" onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
  );
}
