'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { signup } from '@/features/auth/actions/signup.action';
import { ROUTES } from '@/shared/config/routes.config';
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
import type { SignupField, SignupState } from '@/types/auth';

const initialState: SignupState = null;

export default function SignupForm(props: React.ComponentProps<typeof Card>) {
  const [state, formAction, isPending] = useActionState<SignupState, FormData>(
    async (prev, fd) => signup(prev, fd),
    initialState,
  );

  const isInvalid = (k: SignupField) =>
    !state?.ok && hasFieldError(state?.error, k);

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form<SignupField, SignupState> state={state} action={formAction}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
                required
                aria-invalid={isInvalid('name') || undefined}
              />
              <FieldErrorFirst
                error={state?.ok === false ? state.error : undefined}
                field="name"
                Component={FieldError}
              />
            </Field>

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
              <FieldLabel htmlFor="password">Password</FieldLabel>
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
              <FieldLabel htmlFor="confirm-password">
                Confirm Password
              </FieldLabel>
              <Input
                id="confirm-password"
                name="confirm-password"
                type="password"
                required
                aria-invalid={isInvalid('confirmPassword') || undefined}
              />
              <FieldErrorFirst
                error={state?.ok === false ? state.error : undefined}
                field="confirmPassword"
                Component={FieldError}
              />
            </Field>

            <Field>
              <Button disabled={isPending}>
                {isPending ? 'Creating…' : 'Create Account'}
              </Button>

              <FieldDescription className="px-6 text-center">
                Already have an account?{' '}
                <Link href={`${ROUTES.AUTH}?mode=login`}>Sign in</Link>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </Form>
      </CardContent>
    </Card>
  );
}
