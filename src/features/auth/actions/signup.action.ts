'use server';

import { ConflictError } from '@/core/errors';
import { fieldErrors, formError } from '@/core/result';
import {
  signUpSchema,
  type SignUpDTO,
} from '@/features/auth/schemas/signup.schema';
import { createAuthSession } from '@/features/auth/server/auth';
import { signUpService } from '@/features/auth/services/auth.service';
import { ROUTES } from '@/shared/config/routes.config';
import type { SignupField, SignupState } from '@/types/auth';
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
    const fe = parsed.error.flatten().fieldErrors;
    return fieldErrors<SignupField>({
      name: fe.name,
      email: fe.email,
      password: fe.password,
      confirmPassword: fe.confirmPassword,
    });
  }

  const dto: SignUpDTO = {
    name: parsed.data.name,
    email: parsed.data.email,
    password: parsed.data.password,
  };

  const res = await signUpService(dto);

  if (!res.ok) {
    if (res.error instanceof ConflictError) {
      return fieldErrors<SignupField>({ email: ['Email already in use'] });
    }
    return formError('Unexpected error. Please try again later.');
  }

  await createAuthSession(res.value.id);
  redirect(ROUTES.DASHBOARD);
}
