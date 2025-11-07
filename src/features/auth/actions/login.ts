'use server';

import { ROUTES } from '@/shared/config/routes.config';
import { redirect } from 'next/navigation';

import { LoginState } from '@/types/auth';
import { LoginDTO, loginSchema } from '../schemas/login.schema';
import { loginService } from '../services/login.service';

import { events, logger } from '@/core';
import { ConflictError } from '@/core/errors';
import { createAuthSession } from '@/shared/lib/auth';

export async function login(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const raw = {
    email: String(formData.get('email') ?? ''),
    password: String(formData.get('password') ?? ''),
  };

  const parsed = loginSchema.safeParse(raw);

  if (!parsed.success) {
    const { fieldErrors } = parsed.error.flatten();
    return {
      message: 'Please enter valid credentials',
      errors: fieldErrors,
      values: { email: raw.email },
    };
  }

  const dto: LoginDTO = {
    email: parsed.data.email,
    password: parsed.data.password,
  };

  const res = await loginService(dto);

  if (!res.ok) {
    if (res.error instanceof ConflictError) {
      return {
        errors: {
          email: ['Invalid email or password'],
          password: ['Invalid email or password'],
        },
        values: { email: dto.email },
      };
    }

    return {
      message: 'Unexpected error. Please try again later.',
      values: { email: dto.email },
    };
  }

  const user = res.value;

  try {
    await createAuthSession(user.id);

    await events.emit('user.loggedIn', { userId: user.id });
  } catch (e) {
    logger.error('Failed to finalize login (session/events)', {
      error: e,
      userId: user.id,
    });
  }

  redirect(ROUTES.DASHBOARD);
}
