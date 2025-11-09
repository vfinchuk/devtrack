'use server';

import { ConflictError } from '@/core';
import {
  signUpSchema,
  type SignUpDTO,
} from '@/features/auth/schemas/signup.schema';
import { createAuthSession } from '@/features/auth/services/auth';
import { signUpService } from '@/features/auth/services/auth.service';
import { ROUTES } from '@/shared/config/routes.config';
import { SignupState } from '@/types/auth';
import { redirect } from 'next/navigation';

export async function signup(
  _prev: SignupState,
  formData: FormData,
): Promise<SignupState> {
  const raw = {
    name: String(formData.get('name') ?? ''),
    email: String(formData.get('email') ?? ''),
    password: String(formData.get('password') ?? ''),
    confirmPassword: String(formData.get('confirm-password') ?? ''),
  };

  const parsed = signUpSchema.safeParse(raw);

  if (!parsed.success) {
    const { fieldErrors } = parsed.error.flatten();
    return {
      message: 'Please fix form errors',
      errors: fieldErrors,
      values: { name: raw.name, email: raw.email },
    };
  }

  const dto: SignUpDTO = {
    name: parsed.data.name,
    email: parsed.data.email,
    password: parsed.data.password,
  };

  const res = await signUpService(dto);

  if (!res.ok) {
    if (res.error instanceof ConflictError) {
      return {
        message: res.error.message,
        errors: { email: ['Email already in use'] },
        values: { name: dto.name, email: dto.email },
      };
    }

    return {
      message: 'Unexpected error',
      values: { name: dto.name, email: dto.email },
    };
  }

  await createAuthSession(res.value.id);

  redirect(ROUTES.DASHBOARD);
}
