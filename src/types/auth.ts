import type { FormResult } from '@/core/result';

/* ---------- LOGIN ---------- */
export type LoginField = 'email' | 'password';
export type LoginState = FormResult<{ id: string }, LoginField> | null;

/* ---------- SIGNUP ---------- */
export type SignupField = 'name' | 'email' | 'password' | 'confirmPassword';
export type SignupState = FormResult<{ id: string }, SignupField> | null;
