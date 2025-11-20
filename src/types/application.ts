import { FormResult } from '@/core';

export type CreateApplicationField =
  | 'companyId'
  | 'role'
  | 'status'
  | 'seniority'
  | 'employmentType'
  | 'source'
  | 'sourceUrl'
  | 'salaryMin'
  | 'salaryMax'
  | 'currency'
  | 'compensationNote'
  | 'appliedAt'
  | 'lastActivityAt'
  | 'archived';

export type CreateApplicationState = FormResult<
  { id: string },
  CreateApplicationField
> | null;

export type UpdateApplicationField =
  | 'id'
  | 'companyId'
  | 'role'
  | 'status'
  | 'seniority'
  | 'employmentType'
  | 'source'
  | 'sourceUrl'
  | 'salaryMin'
  | 'salaryMax'
  | 'currency'
  | 'compensationNote'
  | 'appliedAt'
  | 'lastActivityAt'
  | 'archived';

export type UpdateApplicationState = FormResult<
  { id: string },
  UpdateApplicationField
> | null;

export type DeleteApplicationField = 'id';

export type DeleteApplicationState = FormResult<
  { id: string },
  DeleteApplicationField
> | null;
