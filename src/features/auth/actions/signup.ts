'use server';

import { ConflictError } from '@/core';
import {
  signUpSchema,
  type SignUpDTO,
} from '@/features/auth/schemas/auth.schema';
import { signUpService } from '@/features/auth/services/auth.service';
import { ROUTES } from '@/shared/config/routes.config';
import { createAuthSession } from '@/shared/lib/auth';
import { redirect } from 'next/navigation';

type FormState = {
  message?: string;
  errors?: Record<string, string[]>;
  values?: Record<string, string>;
};

export async function signup(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
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

  // Формуємо "trusted DTO" для сервісу — без confirmPassword
  const dto: SignUpDTO = {
    name: parsed.data.name,
    email: parsed.data.email,
    password: parsed.data.password,
  };

  const res = await signUpService(dto);

  if (!res.ok) {
    // Мапимо доменні помилки на форму
    if (res.error instanceof ConflictError) {
      return {
        message: res.error.message,
        errors: { email: ['Email already in use'] },
        values: { name: raw.name, email: raw.email },
      };
    }

    // Fallback для інших внутрішніх помилок
    return {
      message: 'Unexpected error',
      values: { name: raw.name, email: raw.email },
    };
  }

  await createAuthSession(res.value.id);

  redirect(ROUTES.DASHBOARD);
}
