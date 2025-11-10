import type { ComponentType } from 'react';
import { AddCompanyDialog } from '../companies/dialogs/add-company-dialog';

export type DialogComponent<P = Record<string, unknown>> = ComponentType<P>;

export const dialogRegistry = {
  'add-company': AddCompanyDialog,
  // 'edit-company': EditCompanyDialog,
  // 'delete-company': DeleteCompanyDialog,
} as const;
