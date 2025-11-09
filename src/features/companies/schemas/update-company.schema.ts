import 'server-only';
import { z } from 'zod';

export const companyIdSchema = z.string().cuid('Invalid company id');
export type CompanyId = z.infer<typeof companyIdSchema>;

export const updateCompanySchema = z.object({
  id: companyIdSchema,
  name: z.string().trim().min(1, 'Name is required').max(120, 'Too long'),
});

export type UpdateCompanyInput = z.infer<typeof updateCompanySchema>;
export type UpdateCompanyDTO = Pick<UpdateCompanyInput, 'id' | 'name'>;
