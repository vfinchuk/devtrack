import { ConfirmDialog } from '@/shared/ui/overlays/confirm-dialog';
import { ErrorDialog } from '@/shared/ui/overlays/error-dialog';
import { FormDialog } from '@/shared/ui/overlays/form-dialog';
import type { ComponentType } from 'react';
import { AddCompanyDialog } from '../companies/dialogs/add-company-dialog';
import { EditCompanyDialog } from '../companies/dialogs/edit-company-dialog';
import { DialogId } from './dialog.slice';
import { DialogPropsMap } from './dialog.types';

export type DialogComponent<P = Record<string, unknown>> = ComponentType<P>;

export const dialogRegistry = {
  confirm: ConfirmDialog,
  error: ErrorDialog,
  form: FormDialog,
  'add-company': AddCompanyDialog,
  'edit-company': EditCompanyDialog,
} satisfies {
  [K in DialogId]: ComponentType<DialogPropsMap[K]>;
};
