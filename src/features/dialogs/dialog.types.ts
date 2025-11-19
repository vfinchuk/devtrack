import type { EditCompanyDialogProps } from '@/features/companies/dialogs/edit-company-dialog';
import { BaseDialogProps } from '@/shared/ui/overlays/base-dialog';
import type { ConfirmDialogProps } from '@/shared/ui/overlays/confirm-dialog';
import type { ErrorDialogProps } from '@/shared/ui/overlays/error-dialog';
import type { FormDialogProps } from '@/shared/ui/overlays/form-dialog';

export interface DialogPropsMap {
  confirm: BaseDialogProps & ConfirmDialogProps;
  form: BaseDialogProps & FormDialogProps;
  error: BaseDialogProps & ErrorDialogProps;
  'create-company': BaseDialogProps;
  'edit-company': BaseDialogProps & EditCompanyDialogProps;
}
