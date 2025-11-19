'use server';

import { ConflictError } from '@/core/errors';
import { fieldErrors, formError } from '@/core/result';
import { createAuthSession } from '@/features/auth/server/auth';
import { ROUTES } from '@/shared/config/routes.config';
import type { LoginField, LoginState } from '@/types/auth';
import { redirect } from 'next/navigation';
import { LoginDTO, LoginSchema } from '../schemas/auth.schema';
import { loginService } from '../services/login.service';

export async function login(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const raw = {
    email: String(formData.get('email') ?? ''),
    password: String(formData.get('password') ?? ''),
  };

  const parsed = LoginSchema.safeParse(raw);
  if (!parsed.success) {
    const fe = parsed.error.flatten().fieldErrors;
    return fieldErrors<LoginField>({ email: fe.email, password: fe.password });
  }

  const dto: LoginDTO = parsed.data;
  const res = await loginService(dto);

  if (!res.ok) {
    if (res.error instanceof ConflictError) {
      return fieldErrors<LoginField>({
        email: ['Invalid email or password'],
        password: ['Invalid email or password'],
      });
    }
    return formError('Unexpected error. Please try again later.');
  }

  await createAuthSession(res.value.id);
  redirect(ROUTES.DASHBOARD);
}
