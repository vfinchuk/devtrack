import 'server-only';
import { z } from 'zod';

export const deleteCompanySchema = z.object({
  id: z.string().cuid('Invalid company id'),
});

export type DeleteCompanyInput = z.infer<typeof deleteCompanySchema>;

export type DeleteCompanyDTO = Pick<DeleteCompanyInput, 'id'>;
