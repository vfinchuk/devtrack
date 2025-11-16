'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { login } from '@/features/auth/actions/login.action';
import { ROUTES } from '@/shared/config/routes.config';
import { cn } from '@/shared/lib/utils';
import { Field, FieldDescription, FieldGroup } from '@/shared/ui/form/field';
import { Form } from '@/shared/ui/form/form';
import { FormField } from '@/shared/ui/form/form-field';
import { PasswordField } from '@/shared/ui/form/password-field';
import { LoadingButton } from '@/shared/ui/loading-button';
import type { LoginField, LoginState } from '@/types/auth';
import Link from 'next/link';
import { useActionState } from 'react';

const initialState: LoginState = null;

export default function LoginForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const [state, formAction, isPending] = useActionState<LoginState, FormData>(
    async (_prev, formData) => login(_prev, formData),
    initialState,
  );

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
              <FormField<LoginField>
                state={state}
                field="email"
                label="Email"
                type="email"
                placeholder="m@example.com"
                required
              />

              <PasswordField<LoginField>
                state={state}
                field="password"
                label="Password"
                required
                labelExtra={
                  <Link
                    href="#"
                    className="text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                }
              />

              <Field>
                <LoadingButton
                  type="submit"
                  isLoading={isPending}
                  className="w-full"
                >
                  Sign in
                </LoadingButton>

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
