'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { login } from '@/features/auth/actions/login.action';
import { ROUTES } from '@/shared/config/routes.config';
import { cn } from '@/shared/lib/utils';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/shared/ui/form/field';
import Link from 'next/link';
import { useActionState } from 'react';

import { hasFieldError } from '@/shared/forms/errors';
import { FieldErrorFirst } from '@/shared/forms/form-errors';
import { Form } from '@/shared/ui/form/form';
import { LoadingButton } from '@/shared/ui/loading-button';
import type { LoginField, LoginState } from '@/types/auth';

const initialState: LoginState = null;

export default function LoginForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const [state, formAction, isPending] = useActionState<LoginState, FormData>(
    async (_prev, formData) => login(_prev, formData),
    initialState,
  );

  const isInvalid = (k: LoginField) =>
    !state?.ok && hasFieldError(state?.error, k);

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Log in to your account</CardTitle>
          <CardDescription>
            Enter your email and password to continue
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form<LoginField, LoginState> state={state} action={formAction}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  aria-invalid={isInvalid('email') || undefined}
                />
                <FieldErrorFirst
                  error={state?.ok === false ? state.error : undefined}
                  field="email"
                  Component={FieldError}
                />
              </Field>

              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Link
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  aria-invalid={isInvalid('password') || undefined}
                />
                <FieldErrorFirst
                  error={state?.ok === false ? state.error : undefined}
                  field="password"
                  Component={FieldError}
                />
              </Field>

              <Field>
                <LoadingButton isLoading={isPending}>Sign in</LoadingButton>

                <FieldDescription className="text-center">
                  Don&apos;t have an account?{' '}
                  <Link href={`${ROUTES.AUTH}?mode=signup`}>Sign up</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
