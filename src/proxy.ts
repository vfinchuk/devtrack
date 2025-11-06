import { SESSION_COOKIE_NAME } from '@/shared/config/auth.const';
import { ROUTES } from '@/shared/config/routes.config';
import { collectProtectedPaths } from '@/shared/lib/route-utils';
import { NextResponse, type NextRequest } from 'next/server';

const PROTECTED_PATHS = collectProtectedPaths();

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const hasSession = Boolean(req.cookies.get(SESSION_COOKIE_NAME)?.value);

  console.log('hasSession', hasSession);

  const isProtected = PROTECTED_PATHS.some((p) => {
    return pathname === p || pathname.startsWith(p + '/');
  });

  const isAuthPage = pathname.startsWith(ROUTES.AUTH);

  if (isProtected && !hasSession) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = ROUTES.AUTH;
    return NextResponse.redirect(redirectUrl);
  }

  if (isAuthPage && hasSession) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = ROUTES.DASHBOARD;
    redirectUrl.search = '';
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|static|images|favicon.ico).*)'],
};
