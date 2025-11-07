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
import { LoginState } from '@/types/auth';
import Link from 'next/link';
import { useActionState } from 'react';

const initialState: LoginState = {};

export default function LoginForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const [formState, formAction, isPending] = useActionState(
    login,
    initialState,
  );

  const hasErr = (k: keyof NonNullable<LoginState['errors']>) =>
    (formState.errors?.[k]?.length ?? 0) > 0;

  const renderErrors = (k: keyof NonNullable<LoginState['errors']>) =>
    formState.errors?.[k]?.map((msg, i) => (
      <FieldError key={i}>{msg}</FieldError>
    ));

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
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
                  aria-invalid={hasErr('password') || undefined}
                />
                {renderErrors('password')}
              </Field>
              <Field>
                <Button disabled={isPending}>
                  {isPending ? 'Pending…' : 'Create Account'}
                </Button>
                {/* <Button variant="outline" type="button">
                  Login with Google
                </Button> */}
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
