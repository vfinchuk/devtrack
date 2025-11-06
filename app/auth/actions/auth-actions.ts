'use server';

import { signUpSchema } from '@/server/schemas/auth.schema';
import { AuthError, signUpService } from '@/server/services/auth.services';
import { ROUTES } from '@/shared/config/routes.config';
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

  const result = signUpSchema.safeParse(raw);

  if (!result.success) {
    const { fieldErrors } = result.error.flatten();
    return {
      message: 'Please fix form errors',
      errors: fieldErrors,
      values: { name: raw.name, email: raw.email },
    };
  }

  try {
    await signUpService(result.data);
  } catch (e) {
    if (e instanceof AuthError) {
      const errs =
        e.code === 'EMAIL_TAKEN'
          ? { email: ['Email already in use'] }
          : undefined;
      return {
        message: e.message,
        errors: errs,
        values: { name: raw.name, email: raw.email },
      };
    }
    return { message: 'Unexpected error' };
  }

  redirect(ROUTES.DASHBOARD);
}
