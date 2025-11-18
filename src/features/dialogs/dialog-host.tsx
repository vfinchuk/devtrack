'use client';

import { BaseDialog } from '@/shared/ui/overlays/base-dialog';
import type React from 'react';
import { dialogRegistry } from './dialog.registry';
import type { DialogId } from './dialog.slice';
import type { DialogPropsMap } from './dialog.types';
import { useDialog } from './use-dialog';

export function DialogHost() {
  const { open, id, props, closeDialog } = useDialog();

  if (!open || !id) return null;

  const { title, description, size, ...restProps } = (props ??
    {}) as DialogPropsMap[DialogId];

  const Comp = dialogRegistry[id] as React.ComponentType<
    DialogPropsMap[DialogId]
  >;

  return (
    <BaseDialog
      open={open}
      onOpenChange={(v) => !v && closeDialog()}
      title={title}
      description={description}
      size={size}
    >
      <Comp {...restProps} />
    </BaseDialog>
  );
}
