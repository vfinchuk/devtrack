'use client';

import { DialogPropsMap } from '@/features/dialogs/dialog.types';
import { useDialog } from '@/features/dialogs/use-dialog';
import { notify } from '@/shared/lib/toast';
import { Company } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { deleteCompany } from '../actions/delete-company.action';

export function useCompanyDialogs() {
  const router = useRouter();
  const { openDialog, closeDialog } = useDialog();

  return {
    openCreateCompanyDialog: (props: DialogPropsMap['create-company'] = {}) => {
      openDialog('create-company', {
        title: 'Create Company',
        description: 'Add a new company to your workspace.',
        ...props,
      });
    },

    openEditCompanyDialog: (props: DialogPropsMap['edit-company']) => {
      openDialog('edit-company', {
        title: 'Edit Company',
        description: 'Update company details.',
        ...(props || {}),
      });
    },

    openDeleteCompanyDialog: (
      props: DialogPropsMap['confirm'] & {
        company: Company;
      },
    ) => {
      const { id, name } = props.company;

      openDialog('confirm', {
        title: 'Delete company',
        description: `Are you sure you want to delete "${name}"?`,
        confirmLabel: 'Delete',
        variant: 'destructive',
        onConfirm: async () => {
          const res = await deleteCompany(id);

          if (!res.ok) {
            notify.error('Could not delete application', {
              description:
                'Something went wrong while deleting the application. Please try again.',
            });

            return;
          }

          router.refresh();
          closeDialog();
        },
      });
    },
  };
}
