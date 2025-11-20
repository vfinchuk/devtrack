import {
  ApplicationSeniority,
  ApplicationSource,
  ApplicationStatus,
  Currency,
  EmploymentType,
} from '@prisma/client';
import 'server-only';
import { z } from 'zod';

/* -------------------- CREATE -------------------- */

export const CreateApplicationSchema = z.object({
  companyId: z.string().min(1, 'Company is required'),
  role: z.string().min(2, 'Role is required').max(200),

  status: z.enum(ApplicationStatus).default(ApplicationStatus.APPLIED),
  seniority: z.enum(ApplicationSeniority).default(ApplicationSeniority.MIDDLE),
  employmentType: z.enum(EmploymentType).default(EmploymentType.B2B),

  source: z.enum(ApplicationSource).optional(),
  sourceUrl: z.string().url().optional(),

  // Int? але з форми може прийти строка → coerce
  salaryMin: z.coerce.number().int().nonnegative().optional(),
  salaryMax: z.coerce.number().int().nonnegative().optional(),

  currency: z.enum(Currency).default(Currency.EUR),
  compensationNote: z.string().max(2000).optional(),

  // у БД є default(now()), але з форми можемо дозволити пробити
  appliedAt: z.coerce.date().optional(),
  lastActivityAt: z.coerce.date().optional(),

  archived: z.coerce.boolean().default(false),
});

export type CreateApplicationDTO = z.infer<typeof CreateApplicationSchema>;
export type ApplicationFormField = keyof CreateApplicationDTO;

/* -------------------- UPDATE -------------------- */

export const UpdateApplicationSchema = CreateApplicationSchema.extend({
  id: z.string().min(1, 'Application id is required'),
});

export type UpdateApplicationDTO = z.infer<typeof UpdateApplicationSchema>;

/* -------------------- DELETE -------------------- */

export const DeleteApplicationSchema = z.object({
  id: z.string().min(1, 'Application id is required'),
});

export type DeleteApplicationDTO = z.infer<typeof DeleteApplicationSchema>;
