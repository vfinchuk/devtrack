import { APP_ROUTES, type AppRoute } from '@/shared/config/routes.config';

export function collectProtectedPaths(
  routes: AppRoute[] = APP_ROUTES,
): string[] {
  const result: string[] = [];

  const walk = (rs: AppRoute[]) => {
    for (const r of rs) {
      if (r.auth) result.push(r.path);
      if (r.children) walk(r.children);
    }
  };

  walk(routes);
  return result;
}
