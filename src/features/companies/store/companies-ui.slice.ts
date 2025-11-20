'use client';

import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type CompaniesUiState = {
  lastCreatedCompanyId: string | null;
};

const initialState: CompaniesUiState = {
  lastCreatedCompanyId: null,
};

const companiesUiSlice = createSlice({
  name: 'companiesUi',
  initialState,
  reducers: {
    setLastCreatedCompanyId(state, action: PayloadAction<string>) {
      state.lastCreatedCompanyId = action.payload;
    },
    resetLastCreatedCompanyId(state) {
      state.lastCreatedCompanyId = null;
    },
  },
});

export const { setLastCreatedCompanyId, resetLastCreatedCompanyId } =
  companiesUiSlice.actions;

export const companiesUiReducer = companiesUiSlice.reducer;
