'use client';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  closeDialog,
  openDialog,
  resetDialog,
  type DialogId,
} from './dialog.slice';

type OpenDialogArgs = {
  id: DialogId;
  props?: Record<string, unknown>;
};

export function useDialog() {
  const dispatch = useAppDispatch();
  const state = useAppSelector((s) => s.dialog);

  return {
    open: state.open,
    id: state.id,
    props: state.props,

    openDialog: (args: OpenDialogArgs) => dispatch(openDialog(args)),
    closeDialog: () => dispatch(closeDialog()),
    resetDialog: () => dispatch(resetDialog()),
  };
}
