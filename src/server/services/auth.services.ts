'server only';

import { createAuthSession } from '@/shared/lib/auth';
import { hashUserPassword } from '@/shared/lib/hash';
import { prisma } from '@/shared/lib/prisma';
import { Prisma } from '@prisma/client';
import { SignUpInput } from '../schemas/auth.schema';

export class AuthError extends Error {
  constructor(
    public code: 'EMAIL_TAKEN' | 'INVALID_CREDENTIALS' | 'UNKNOWN',
    massage: string,
  ) {
    super(massage);
  }
}

export async function signUpService(input: SignUpInput) {
  const exist = await prisma.user.findUnique({
    where: { email: input.email },
  });

  if (exist) {
    throw new AuthError('EMAIL_TAKEN', 'Email already is use');
  }

  const hashed = hashUserPassword(input.password);

  try {
    const user = await prisma.$transaction(async (tx) => {
      const u = await tx.user.create({
        data: { email: input.email, name: input.name },
      });

      await tx.key.create({
        data: {
          id: `email:${input.email}`,
          userId: u.id,
          hashedPassword: hashed,
          primary: true,
        },
      });

      return u;
    });

    await createAuthSession(user.id);

    return user;
  } catch (e) {
    if (
      e instanceof Prisma.PrismaClientKnownRequestError &&
      e.code === 'P2002'
    ) {
      throw new AuthError('EMAIL_TAKEN', 'Email already is use');
    }

    throw new AuthError('UNKNOWN', 'Failed to create user');
  }
}
