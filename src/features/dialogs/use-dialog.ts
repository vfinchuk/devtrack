'use client';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  closeDialog,
  openDialog as openDialogAction,
  resetDialog,
  type DialogId,
} from './dialog.slice';
import type { DialogPropsMap } from './dialog.types';

export function useDialog() {
  const dispatch = useAppDispatch();
  const state = useAppSelector((s) => s.dialog);

  function openDialog<T extends DialogId>(
    id: T,
    props?: DialogPropsMap[T] | null,
  ) {
    dispatch(openDialogAction({ id, props }));
  }

  return {
    open: state.open,
    id: state.id,
    props: state.props,

    openDialog,
    closeDialog: () => dispatch(closeDialog()),
    resetDialog: () => dispatch(resetDialog()),
  };
}
