import 'server-only';
import { z } from 'zod';

export const createCompanySchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(120, 'Too long'),
  website: z.string().trim().max(256, 'Too long').optional().or(z.literal('')),
  location: z.string().trim().max(120, 'Too long').optional().or(z.literal('')),
});

export type CreateCompanyInput = z.infer<typeof createCompanySchema>;

export type CreateCompanyDTO = Pick<
  CreateCompanyInput,
  'name' | 'website' | 'location'
>;
