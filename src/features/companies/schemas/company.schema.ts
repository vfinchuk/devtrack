import 'server-only';
import { z } from 'zod';

/* -------------------- CREATE -------------------- */

export const CreateCompanySchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(120, 'Too long'),
  website: z.string().trim().max(256, 'Too long').optional().or(z.literal('')),
  location: z.string().trim().max(120, 'Too long').optional().or(z.literal('')),
});

export type CreateCompanyDTO = z.infer<typeof CreateCompanySchema>;

/* -------------------- UPDATE -------------------- */

export const UpdateCompanySchema = z.object({
  id: z.string().min(1, 'Invalid company id'),

  name: z.string().trim().min(1, 'Name is required').max(120, 'Too long'),
  website: z.string().trim().max(256, 'Too long').optional().or(z.literal('')),
  location: z.string().trim().max(120, 'Too long').optional().or(z.literal('')),
});

export type UpdateCompanyDTO = z.infer<typeof UpdateCompanySchema>;

/* -------------------- DELETE -------------------- */

export const DeleteCompanySchema = z.object({
  id: z.string().min(1, 'Invalid company id'),
});

export type DeleteCompanyDTO = z.infer<typeof DeleteCompanySchema>;
