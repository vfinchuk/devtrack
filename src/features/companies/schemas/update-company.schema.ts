import 'server-only';
import { z } from 'zod';

export const updateCompanySchema = z.object({
  id: z.string().cuid('Invalid company id'),
  name: z.string().trim().min(1, 'Name is required').max(120, 'Too long'),
  website: z.string().trim().max(256, 'Too long').optional().or(z.literal('')),
  location: z.string().trim().max(120, 'Too long').optional().or(z.literal('')),
});

export type UpdateCompanyInput = z.infer<typeof updateCompanySchema>;

export type UpdateCompanyDTO = Pick<
  UpdateCompanyInput,
  'id' | 'name' | 'website' | 'location'
>;
