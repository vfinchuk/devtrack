import type { FormState } from './form';

export type SignupField = 'name' | 'email' | 'password' | 'confirmPassword';
export type SignupValues = { name?: string; email?: string };
export type SignupState = FormState<SignupField, SignupValues>;

export type LoginField = 'email' | 'password';
export type LoginValues = { email?: string; password?: string };
export type LoginState = FormState<LoginField, LoginValues>;
