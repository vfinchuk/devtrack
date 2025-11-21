'use client';

import { APP_ROUTES, type AppRoute } from '@/shared/config/routes.config';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/shared/ui/layout/breadcrumb';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const isDefined = <T,>(v: T | undefined): v is T => v !== undefined;

const ROUTE_MAP: Map<string, AppRoute> = (() => {
  const map = new Map<string, AppRoute>();
  const walk = (routes: AppRoute[]) => {
    for (const r of routes) {
      map.set(r.path, r);
      if (r.children) walk(r.children);
    }
  };
  walk(APP_ROUTES);
  return map;
})();

const titleFromSegment = (seg: string) =>
  decodeURIComponent(seg)
    .split('-')
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(' ');

export default function Breadcrumbs() {
  const rawPath = usePathname() || '/';
  const pathname =
    rawPath !== '/' && rawPath.endsWith('/') ? rawPath.slice(0, -1) : rawPath;

  const dashboardRoute = ROUTE_MAP.get('/');

  const crumbs = React.useMemo(() => {
    const segments = pathname.split('/').filter(Boolean);
    const paths = segments.map(
      (_, i) => '/' + segments.slice(0, i + 1).join('/'),
    );

    return paths
      .map(
        (p, i) =>
          ROUTE_MAP.get(p) ??
          ({
            name: titleFromSegment(segments[i]),
            path: p,
            auth: true,
            showInSidebar: false,
          } as AppRoute),
      )
      .filter(isDefined);
  }, [pathname]);

  if (pathname === '/' && dashboardRoute) {
    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>{dashboardRoute.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
  }

  if (!crumbs.length) return null;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {crumbs.map((route, i) => {
          const last = i === crumbs.length - 1;
          return (
            <React.Fragment key={route.path}>
              <BreadcrumbItem>
                {last ? (
                  <BreadcrumbPage>{route.name}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={route.path}>{route.name}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!last && <BreadcrumbSeparator />}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
