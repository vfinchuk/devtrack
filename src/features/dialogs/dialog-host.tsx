'use client';

import { DialogBase } from '@/shared/ui/dialog-base';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { dialogRegistry } from './dialog.registry';
import { closeDialog } from './dialog.slice';

export function DialogHost() {
  const dispatch = useAppDispatch();
  const { open, id, props } = useAppSelector((s) => s.dialog);

  if (!open || !id) return null;

  const Comp = dialogRegistry[id as keyof typeof dialogRegistry];
  if (!Comp) return null;

  return (
    <DialogBase open={open} onOpenChange={(v) => !v && dispatch(closeDialog())}>
      <Comp {...(props ?? {})} />
    </DialogBase>
  );
}
