import { env } from '@/core';
import { PrismaAdapter } from '@lucia-auth/adapter-prisma';
import { User } from '@prisma/client';
import { Lucia } from 'lucia';
import { cookies } from 'next/headers';
import { prisma } from './prisma';

declare module 'lucia' {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: User;
    UserAttributes: SessionUser;
  }
}

export type SessionUser = {
  id: string;
  email: string | null;
  name: string | null;
};

const adapter = new PrismaAdapter(prisma.session, prisma.user);

const lucia = new Lucia<User, SessionUser>(adapter, {
  sessionCookie: {
    expires: false,
    attributes: {
      secure: env.NODE_ENV === 'production',
    },
  },
  getUserAttributes: (dbUser) => ({
    id: dbUser.id,
    email: dbUser.email,
    name: dbUser.name,
  }),
});

export async function createAuthSession(userId: string) {
  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);

  (await cookies()).set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
}

export async function verifyAuthSession() {
  const cookiesApi = await cookies();
  const sessionCookie = cookiesApi.get(lucia.sessionCookieName);

  if (!sessionCookie) {
    return {
      user: null,
      session: null,
    };
  }

  const sessionId = sessionCookie.value;

  if (!sessionId) {
    return {
      user: null,
      session: null,
    };
  }

  const result = await lucia.validateSession(sessionId);

  try {
    if (result.session && result.session.fresh) {
      const sessionCookie = lucia.createSessionCookie(result.session.id);
      const cookiesApi = await cookies();

      cookiesApi.set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );
    }

    if (!result.session) {
      const blank = lucia.createBlankSessionCookie();
      const cookiesApi = await cookies();

      cookiesApi.set(blank.name, blank.value, blank.attributes);
    }
  } catch {}

  return result;
}

export async function destroyAuthSession() {
  const { session } = await verifyAuthSession();

  if (session) {
    await lucia.invalidateSession(session.id);
  }

  const blank = lucia.createBlankSessionCookie();
  const cookiesApi = await cookies();
  cookiesApi.set(blank.name, blank.value, blank.attributes);
}
