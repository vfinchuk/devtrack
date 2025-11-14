'use client';

import { store } from '@/store/store';
import { Provider } from 'react-redux';

import { ThemeProvider } from '@/shared/theme/theme-provider';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/shared/ui/sidebar';

import { AppSidebar } from '@/components/layout/app-sidebar';
import Breadcrumbs from '@/components/navigation/breadcrumbs';
import LogoutButton from '@/features/auth/components/logout-button';
import { DialogHost } from '@/features/dialogs/dialog-host';
import { ModeToggle } from '@/shared/theme/mode-toggle';

export default function ClientShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:m-2 focus:rounded focus:bg-accent focus:px-3 focus:py-2"
        >
          Skip to content
        </a>

        <SidebarProvider>
          <AppSidebar />
          <SidebarInset className="min-h-screen">
            <header className="flex h-16 shrink-0 items-center justify-between border-b bg-background px-4">
              <div className="flex items-center gap-2">
                <SidebarTrigger />
                <Breadcrumbs />
              </div>
              <div className="flex items-center gap-2">
                <ModeToggle />
                <LogoutButton />
              </div>
            </header>

            <main
              id="main"
              role="main"
              className="flex flex-1 flex-col gap-4 p-4"
            >
              {children}
            </main>
          </SidebarInset>
        </SidebarProvider>

        <DialogHost />
      </ThemeProvider>
    </Provider>
  );
}
