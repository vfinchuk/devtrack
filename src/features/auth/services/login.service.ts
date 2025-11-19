import { ConflictError, err, InternalError, ok, Result } from '@/core';
import { verifyPassword } from '@/features/auth/server/password-hash';
import { prisma } from '@/server/db/prisma';
import { LoginDTO } from '../schemas/auth.schema';

export async function loginService(
  input: LoginDTO,
): Promise<
  Result<
    { id: string; email: string | null; name: string | null },
    ConflictError | InternalError
  >
> {
  try {
    const email = input.email.toLowerCase().trim();

    const user = await prisma.user.findUnique({
      where: { email },
      include: { keys: true },
    });

    if (!user) {
      return err(new ConflictError('Invalid email or password'));
    }

    const primaryKey = user.keys.find((k) => k.primary === true);

    if (!primaryKey?.hashedPassword) {
      return err(new InternalError('Primary user key missing'));
    }

    const isValid = verifyPassword(primaryKey.hashedPassword, input.password);

    if (!isValid) {
      return err(new ConflictError('Invalid email or password'));
    }

    return ok({
      id: user.id,
      email: user.email,
      name: user.name,
    });
  } catch (error) {
    return err(new InternalError('Failed to login', error));
  }
}
