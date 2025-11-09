import 'server-only';
import { z } from 'zod';

export const createCompanySchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(120, 'Too long'),
});

export type CreateCompanyInput = z.infer<typeof createCompanySchema>;
export type CreateCompanyDTO = Pick<CreateCompanyInput, 'name'>;
