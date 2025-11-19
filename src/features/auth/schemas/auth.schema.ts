import 'server-only';
import { z } from 'zod';

/* -------------------- LOGIN -------------------- */

export const LoginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export type LoginDTO = z.infer<typeof LoginSchema>;

/* -------------------- SIGNUP -------------------- */

export const SignUpSchema = z
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

export type SignUpDTO = Omit<z.infer<typeof SignUpSchema>, 'confirmPassword'>;
