'use client';

import { companiesUiReducer } from '@/features/companies/store/companies-ui.slice';
import dialogReducer from '@/features/dialogs/dialog.slice';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    dialog: dialogReducer,
    companiesUi: companiesUiReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: ['dialog.props.onConfirm'],
        ignoredActionPaths: ['payload.props.onConfirm'],
      },
    });
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
