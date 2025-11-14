'use client';

import { BaseDialog } from '@/shared/ui/overlays/base-dialog';
import { dialogRegistry } from './dialog.registry';
import { useDialog } from './use-dialog';

export function DialogHost() {
  const { open, id, props, closeDialog } = useDialog();

  if (!open || !id) return null;

  const Comp = dialogRegistry[id as keyof typeof dialogRegistry];
  if (!Comp) return null;

  return (
    <BaseDialog open={open} onOpenChange={(v) => !v && closeDialog()}>
      <Comp {...(props ?? {})} />
    </BaseDialog>
  );
}
