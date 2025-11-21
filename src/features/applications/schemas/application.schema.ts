import {
  ApplicationSeniority,
  ApplicationSource,
  ApplicationStatus,
  Currency,
  EmploymentType,
} from '@prisma/client';
import 'server-only';
import { z } from 'zod';

function validateSalaryRange(
  data: { salaryMin?: number | null; salaryMax?: number | null },
  ctx: z.RefinementCtx,
) {
  const { salaryMin, salaryMax } = data;

  if (salaryMin == null || salaryMax == null) {
    return;
  }

  if (salaryMin > salaryMax) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Salary min must not be greater than salary max',
      path: ['salaryMin'],
    });
  }
}

const applicationCoreShape = {
  companyId: z.string().min(1, 'Company is required'),
  role: z.string().min(2, 'Role is required').max(200),

  status: z.nativeEnum(ApplicationStatus).default(ApplicationStatus.APPLIED),
  seniority: z
    .nativeEnum(ApplicationSeniority)
    .default(ApplicationSeniority.MIDDLE),
  employmentType: z.nativeEnum(EmploymentType).default(EmploymentType.B2B),

  source: z.nativeEnum(ApplicationSource).optional(),
  sourceUrl: z.string().url().optional(),

  salaryMin: z.coerce.number().int().nonnegative().optional(),
  salaryMax: z.coerce.number().int().nonnegative().optional(),

  currency: z.nativeEnum(Currency).default(Currency.EUR),
  compensationNote: z.string().max(2000).optional(),

  appliedAt: z.coerce.date().optional(),
  lastActivityAt: z.coerce.date().optional(),

  archived: z.coerce.boolean().default(false),
} satisfies z.ZodRawShape;

/* -------------------- CREATE -------------------- */

export const CreateApplicationSchema = z
  .object(applicationCoreShape)
  .superRefine(validateSalaryRange);

export type CreateApplicationDTO = z.infer<typeof CreateApplicationSchema>;
export type ApplicationFormField = keyof CreateApplicationDTO;

/* -------------------- UPDATE -------------------- */

export const UpdateApplicationSchema = z
  .object({
    id: z.string().min(1, 'Application id is required'),
    ...applicationCoreShape,
  })
  .superRefine(validateSalaryRange);

export type UpdateApplicationDTO = z.infer<typeof UpdateApplicationSchema>;

/* -------------------- DELETE -------------------- */

export const DeleteApplicationSchema = z.object({
  id: z.string().min(1, 'Application id is required'),
});

export type DeleteApplicationDTO = z.infer<typeof DeleteApplicationSchema>;
