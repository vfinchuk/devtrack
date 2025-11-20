'use client';

import { Button } from '@/components/ui/button';
import { Application } from '@prisma/client';
import { Pencil } from 'lucide-react';

interface Props {
  application: Application;
}

export function EditApplicationButton({ application }: Props) {
  // const dialog = useDialogHost();

  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-8 w-8"
      onClick={() => {
        // dialog.open('application.edit', { applicationId: application.id });
        console.log('TODO: open edit application dialog', application.id);
      }}
    >
      <Pencil className="h-4 w-4" />
      <span className="sr-only">Edit application</span>
    </Button>
  );
}
