'use client';

import { signup } from '@/features/auth/actions/signup';
import { ROUTES } from '@/shared/config/routes.config';
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
import type { SignupState } from '@/types/auth';
import Link from 'next/link';
import { useActionState } from 'react';

const initialState: SignupState = {};

export default function SignupForm(props: React.ComponentProps<typeof Card>) {
  const [formState, formAction, isPending] = useActionState<
    SignupState,
    FormData
  >(signup, initialState);

  const hasErr = (k: keyof NonNullable<SignupState['errors']>) =>
    (formState.errors?.[k]?.length ?? 0) > 0;

  const renderErrors = (k: keyof NonNullable<SignupState['errors']>) =>
    formState.errors?.[k]?.map((msg, i) => (
      <FieldError key={i}>{msg}</FieldError>
    ));

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>

      <CardContent>
        {formState.message && (
          <p role="status" className="mb-4 text-sm text-destructive">
            {formState.message}
          </p>
        )}

        <form action={formAction}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
                required
                aria-invalid={hasErr('name') || undefined}
                defaultValue={formState.values?.name || ''}
              />
              {renderErrors('name')}
            </Field>

            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
                aria-invalid={hasErr('email') || undefined}
                defaultValue={formState.values?.email || ''}
              />
              {renderErrors('email')}
            </Field>

            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                name="password"
                type="password"
                required
                aria-invalid={hasErr('password') || undefined}
              />
              {renderErrors('password')}
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
                aria-invalid={hasErr('confirmPassword') || undefined}
              />
              {renderErrors('confirmPassword')}
            </Field>

            <FieldGroup>
              <Field>
                <Button disabled={isPending}>
                  {isPending ? 'Creating…' : 'Create Account'}
                </Button>
                {/* <Button variant="outline" type="button">
                  Sign up with Google
                </Button> */}
                <FieldDescription className="px-6 text-center">
                  Already have an account?{' '}
                  <Link href={`${ROUTES.AUTH}?mode=login`}>Sign in</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
