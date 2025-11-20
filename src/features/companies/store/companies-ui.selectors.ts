import { RootState } from '@/store/store';

export const selectLastCreatedCompanyId = (state: RootState) => {
  return state.companiesUi.lastCreatedCompanyId;
};
