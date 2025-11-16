import type { FormResult } from '@/core/result';

/* ---------- CREATE COMPANY ---------- */
export type CreateCompanyField = 'name' | 'website' | 'location';
export type CreateCompanyState = FormResult<
  { id: string },
  CreateCompanyField
> | null;

/* ---------- UPDATE COMPANY ---------- */
export type UpdateCompanyField = 'id' | 'name' | 'website' | 'location';
export type UpdateCompanyState = FormResult<
  { id: string },
  UpdateCompanyField
> | null;

/* ---------- DELETE COMPANY ---------- */
export type DeleteCompanyField = 'id';
export type DeleteCompanyState = FormResult<
  { id: string },
  DeleteCompanyField
> | null;
