import 'server-only';
import { z } from 'zod';

export const signUpSchema = z
  .object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });

export type SignUpInput = z.infer<typeof signUpSchema>;

export type SignUpDTO = Pick<SignUpInput, 'name' | 'email' | 'password'>;
