'use client';

import { login } from '@/features/auth/actions/login';
import { ROUTES } from '@/shared/config/routes.config';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/shared/ui/field';
import { Input } from '@/shared/ui/input';
import Link from 'next/link';
import { useActionState } from 'react';

import { hasFieldError } from '@/shared/forms/errors';
import { FieldErrorFirst, GlobalFormError } from '@/shared/forms/form-errors';
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
          {!state?.ok && state?.error && (
            <GlobalFormError
              error={state.error}
              Component={({ children }) => (
                <p role="status" className="mb-4 text-sm text-destructive">
                  {children}
                </p>
              )}
            />
          )}

          <form action={formAction} noValidate>
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
                <Button disabled={isPending}>
                  {isPending ? 'Signing in…' : 'Sign in'}
                </Button>

                <FieldDescription className="text-center">
                  Don&apos;t have an account?{' '}
                  <Link href={`${ROUTES.AUTH}?mode=signup`}>Sign up</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
