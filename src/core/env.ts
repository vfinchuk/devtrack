import { EnvError } from '@/core/errors';
import { z } from 'zod';

const EnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']),
  DATABASE_URL: z.url(),
  // SESSION_SECRET: z.string().min(16),
  PUBLIC_APP_NAME: z.string().default('DevTrack'),
});

export type Env = z.infer<typeof EnvSchema>;

export const env: Env = (() => {
  const parsed = EnvSchema.safeParse(process.env);

  if (!parsed.success) {
    const errors = z.flattenError(parsed.error).fieldErrors;

    throw new EnvError('ENV validation failed', errors);
  }

  return parsed.data;
})();
