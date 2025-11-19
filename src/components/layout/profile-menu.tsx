'use client';

import { LogOut, UserRound } from 'lucide-react';
import Link from 'next/link';
import { useTransition } from 'react';

import { logout } from '@/features/auth/actions/logout.action';
import { ROUTES } from '@/shared/config/routes.config';
import { ModeToggle } from '@/shared/theme/mode-toggle';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from '@/shared/ui/layout/sidebar';

export function ProfileMenu() {
  const [isLoggingOut, startTransition] = useTransition();

  const handleClickLogoutBtn = () => {
    startTransition(() => {
      logout();
    });
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton asChild>
          <Link href={ROUTES.PROFILE} className="flex items-center gap-2">
            <UserRound className="size-4" />
            <span>Profile</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>

      <SidebarMenuItem>
        <SidebarMenuButton
          asChild
          className="flex items-center justify-between gap-2"
        >
          <div className="flex w-full items-center justify-between gap-2">
            <ModeToggle />
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>

      <SidebarMenuItem>
        <SidebarMenuButton
          className="flex items-center gap-2 text-destructive hover:bg-destructive/10 cursor-pointer"
          disabled={isLoggingOut}
          onClick={handleClickLogoutBtn}
        >
          <LogOut className="size-4" />
          <span>{isLoggingOut ? 'Logging out…' : 'Logout'}</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarSeparator />
    </SidebarMenu>
  );
}
