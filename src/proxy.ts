import { SESSION_COOKIE_NAME } from '@/shared/config/auth.const';
import { ROUTES } from '@/shared/config/routes.config';
import { collectProtectedPaths } from '@/shared/lib/route-utils';
import { NextResponse, type NextRequest } from 'next/server';

const PROTECTED_PATHS = collectProtectedPaths();

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const sessionCookie = req.cookies.get(SESSION_COOKIE_NAME)?.value ?? '';
  const hasSessionCookie = Boolean(sessionCookie);

  const isProtected = PROTECTED_PATHS.some(
    (p) => pathname === p || pathname.startsWith(p + '/'),
  );

  if (isProtected && !hasSessionCookie) {
    const url = req.nextUrl.clone();
    url.pathname = ROUTES.AUTH;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|static|images|favicon.ico).*)'],
};
