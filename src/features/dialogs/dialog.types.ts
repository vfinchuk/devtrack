import { Company } from '@prisma/client';

interface ConfirmDialogProps {
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'default' | 'destructive';
  isSubmitting?: boolean;
  onConfirm?: () => void | Promise<void>;
  onCancel?: () => void;
}

interface FormDialogProps {
  title: string;
  description?: string;
  formId: string;
  submitLabel?: string;
  cancelLabel?: string;
  isSubmitting?: boolean;
  onCancel?: () => void;
}

interface ErrorDialogProps {
  title?: string;
  message?: string;
  onClose?: () => void;
}

interface EditCompanyDialogProps {
  company: Company;
}

export interface DialogPropsMap {
  confirm: ConfirmDialogProps;
  form: FormDialogProps;
  error: ErrorDialogProps;
  'add-company': null;
  'edit-company': EditCompanyDialogProps;
  'delete-company': null;
}
