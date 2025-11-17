'use client';

import { Button } from '@/components/ui/button';

export interface ErrorDialogProps {
  message?: string;
  onClose?: () => void;
}

export function ErrorDialog({
  message = 'An unexpected error occurred. Please try again.',
  onClose,
}: ErrorDialogProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        {message && (
          <p className="whitespace-pre-line text-sm text-muted-foreground">
            {message}
          </p>
        )}
      </div>

      <div className="flex justify-end pt-2">
        <Button variant="destructive" type="button" onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
  );
}
