import 'server-only';
import { z } from 'zod';
import { companyIdSchema } from './update-company.schema';

export const deleteCompanySchema = z.object({
  id: companyIdSchema,
});

export type DeleteCompanyInput = z.infer<typeof deleteCompanySchema>;
export type DeleteCompanyDTO = Pick<DeleteCompanyInput, 'id'>;
