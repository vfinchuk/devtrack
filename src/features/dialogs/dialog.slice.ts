import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { DialogPropsMap } from './dialog.types';

export type DialogId = keyof DialogPropsMap;

export interface DialogState {
  open: boolean;
  id: DialogId | null;
  props: DialogPropsMap[DialogId] | null;
}

const initialState: DialogState = {
  open: false,
  id: null,
  props: null,
};

const slice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    openDialog: (
      state,
      action: PayloadAction<{
        id: DialogId;
        props?: DialogPropsMap[DialogId] | null;
      }>,
    ) => {
      state.open = true;
      state.id = action.payload.id;
      state.props = action.payload.props ?? null;
    },
    closeDialog: (state) => {
      state.open = false;
    },
    resetDialog: (state) => {
      state.open = false;
      state.id = null;
      state.props = null;
    },
  },
});

export const { openDialog, closeDialog, resetDialog } = slice.actions;
export default slice.reducer;
