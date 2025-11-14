import { ConfirmDialog } from '@/shared/ui/overlays/confirm-dialog';
import type { ComponentType } from 'react';
import { AddCompanyDialog } from '../companies/dialogs/add-company-dialog';

export type DialogComponent<P = Record<string, unknown>> = ComponentType<P>;

export const dialogRegistry = {
  confirm: ConfirmDialog,
  'add-company': AddCompanyDialog,
  // 'edit-company': EditCompanyDialog,
  // 'delete-company': DeleteCompanyDialog,
} as const;
