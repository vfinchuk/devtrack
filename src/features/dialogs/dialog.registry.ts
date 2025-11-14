import { ConfirmDialog } from '@/shared/ui/overlays/confirm-dialog';
import { ErrorDialog } from '@/shared/ui/overlays/error-dialog';
import { FormDialog } from '@/shared/ui/overlays/form-dialog';
import type { ComponentType } from 'react';
import { AddCompanyDialog } from '../companies/dialogs/add-company-dialog';

export type DialogComponent<P = Record<string, unknown>> = ComponentType<P>;

export const dialogRegistry = {
  confirm: ConfirmDialog,
  'add-company': AddCompanyDialog,
  error: ErrorDialog,
  form: FormDialog,
  // 'edit-company': EditCompanyDialog,
  // 'delete-company': DeleteCompanyDialog,
} as const;
