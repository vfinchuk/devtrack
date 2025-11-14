import type { FormResult } from '@/core/result';

export type LoginField = 'email' | 'password';
export type LoginState = FormResult<{ id: string }, LoginField> | null;

export type SignupField = 'name' | 'email' | 'password' | 'confirmPassword';
export type SignupState = FormResult<{ id: string }, SignupField> | null;
