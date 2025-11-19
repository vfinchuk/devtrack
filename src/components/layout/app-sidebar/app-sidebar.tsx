'use client';

import { ProfileMenu } from '@/components/layout/profile-menu';
import { APP_VERSION } from '@/shared/config/app.config';
import { APP_ROUTES, type AppRoute } from '@/shared/config/routes.config';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from '@/shared/ui/layout/sidebar';
import { GalleryVerticalEnd } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return path === '/' ? pathname === '/' : pathname === path;
  };

  const renderNav = (routes: AppRoute[]) => (
    <SidebarMenu>
      {routes
        .filter((r) => r.auth && r.showInSidebar && !r.hidden)
        .map((route) => {
          const Icon = route.icon;
          const active = isActive(route.path);
          const hasChildren =
            Array.isArray(route.children) && route.children.length > 0;

          return (
            <SidebarMenuItem key={route.path}>
              <SidebarMenuButton
                asChild
                data-active={active ? '' : undefined}
                aria-current={active ? 'page' : undefined}
              >
                <Link href={route.path} className="flex items-center gap-2">
                  {Icon ? <Icon className="size-4" /> : null}
                  <span>{route.name}</span>
                </Link>
              </SidebarMenuButton>

              {hasChildren ? (
                <SidebarMenuSub>
                  {route
                    .children!.filter((c) => c.showInSidebar && !c.hidden)
                    .map((child) => {
                      const childActive = isActive(child.path);
                      const ChildIcon = child.icon;
                      return (
                        <SidebarMenuSubItem key={child.path}>
                          <SidebarMenuSubButton
                            asChild
                            isActive={childActive}
                            aria-current={childActive ? 'page' : undefined}
                          >
                            <Link
                              href={child.path}
                              className="flex items-center gap-2"
                            >
                              {ChildIcon ? (
                                <ChildIcon className="size-4" />
                              ) : null}
                              {child.name}
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      );
                    })}
                </SidebarMenuSub>
              ) : null}
            </SidebarMenuItem>
          );
        })}
    </SidebarMenu>
  );

  const privateTopLevel = APP_ROUTES.filter(
    (r) => r.auth && r.showInSidebar && !r.parent,
  );

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/" aria-label="Go to dashboard">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <span className="font-medium">DevTrack</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>{renderNav(privateTopLevel)}</SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <ProfileMenu />

        <div className="flex items-center justify-center">
          <span className="text-xs text-muted-foreground">
            app version {APP_VERSION}
          </span>
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
