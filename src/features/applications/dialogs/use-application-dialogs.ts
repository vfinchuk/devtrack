'use client';

import { DialogPropsMap } from '@/features/dialogs/dialog.types';
import { useDialog } from '@/features/dialogs/use-dialog';
import { notify } from '@/shared/lib/toast';
import { Application } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { deleteApplication } from '../actions/delete-application.action';

export function useApplicationDialogs() {
  const router = useRouter();
  const { openDialog, closeDialog } = useDialog();

  return {
    openDeleteApplicationDialog: (
      props: DialogPropsMap['confirm'] & {
        application: Application;
      },
    ) => {
      const { id, role } = props.application;

      openDialog('confirm', {
        title: 'Delete application',
        description: `Are you sure you want to delete the job application with the role "${role}"?`,
        confirmLabel: 'Delete',
        variant: 'destructive',
        onConfirm: async () => {
          const res = await deleteApplication(id);

          if (!res.ok) {
            notify.error('Could not delete Application', {
              description:
                'Something went wrong while deleting the application. Please try again.',
            });

            return;
          }

          notify.success(`Application "${role}" deleted successfully`);

          router.refresh();
          closeDialog();
        },
      });
    },
  };
}
