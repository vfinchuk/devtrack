'use server';

import { hashUserPassword } from '@/features/auth/server/password-hash';
import { prisma } from '@/server/db/prisma';
import { Prisma } from '@prisma/client';

import {
  ConflictError,
  err,
  events,
  InternalError,
  logger,
  ok,
  type Result,
} from '@/core';

import type { SignUpDTO } from '@/features/auth/schemas/signup.schema';

export async function signUpService(
  input: SignUpDTO,
): Promise<
  Result<{ id: string; email: string }, ConflictError | InternalError>
> {
  const email = input.email.toLowerCase().trim();
  const hashed = hashUserPassword(input.password);

  try {
    const user = await prisma.$transaction(async (tx) => {
      const created = await tx.user.create({
        data: { email, name: input.name },
        select: { id: true, email: true },
      });

      await tx.key.create({
        data: {
          id: `email:${email}`,
          userId: created.id,
          hashedPassword: hashed,
          primary: true,
        },
      });

      return created;
    });

    await events.emit('user.signedUp', { userId: user.id, email: user.email });

    return ok({ id: user.id, email: user.email });
  } catch (e) {
    if (
      e instanceof Prisma.PrismaClientKnownRequestError &&
      e.code === 'P2002'
    ) {
      return err(new ConflictError('Email is already in use', e));
    }

    logger.error('Signup transaction failed', { error: e });
    return err(new InternalError('Failed to create user', e));
  }
}
