'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Field, FieldDescription, FieldGroup } from '@/components/ui/field';
import { signup } from '@/features/auth/actions/signup.action';
import { ROUTES } from '@/shared/config/routes.config';
import { Form } from '@/shared/ui/form/form';
import { FormField } from '@/shared/ui/form/form-field';
import { PasswordField } from '@/shared/ui/form/password-field';
import { LoadingButton } from '@/shared/ui/loading-button';
import type { SignupField, SignupState } from '@/types/auth';
import Link from 'next/link';
import { useActionState } from 'react';

const initialState: SignupState = null;

export default function SignupForm(props: React.ComponentProps<typeof Card>) {
  const [state, formAction, isPending] = useActionState<SignupState, FormData>(
    async (prev, fd) => signup(prev, fd),
    initialState,
  );

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
            <FormField<SignupField>
              state={state}
              field="name"
              label="Full Name"
              type="text"
              placeholder="John Doe"
              required
            />

            <FormField<SignupField>
              state={state}
              field="email"
              label="Email"
              type="email"
              placeholder="m@example.com"
              required
            />

            <PasswordField<SignupField>
              state={state}
              field="password"
              label="Password"
              required
            />

            <PasswordField<SignupField>
              state={state}
              field="confirmPassword"
              name="confirm-password"
              id="confirm-password"
              label="Confirm Password"
              required
            />

            <Field>
              <LoadingButton
                type="submit"
                isLoading={isPending}
                className="w-full"
              >
                Create Account
              </LoadingButton>

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
