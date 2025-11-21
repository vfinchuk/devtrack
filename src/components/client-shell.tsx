'use client';

import { AppSidebar } from '@/components/layout/app-sidebar';
import Breadcrumbs from '@/components/navigation/breadcrumbs';
import { DialogHost } from '@/features/dialogs/dialog-host';
import { AppToaster } from '@/shared/providers/app-toaster';
import { ThemeProvider } from '@/shared/theme/theme-provider';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/shared/ui/layout/sidebar';
import { store } from '@/store/store';
import { Provider } from 'react-redux';

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

          <SidebarInset className="h-screen flex flex-col">
            <header className="flex h-16 shrink-0 items-center justify-between border-b bg-background px-4">
              <div className="flex items-center gap-2">
                <SidebarTrigger />
                <Breadcrumbs />
              </div>
            </header>

            <main
              id="main"
              role="main"
              className="flex-1 min-h-0 overflow-y-auto flex flex-col gap-4 p-4"
            >
              {children}
            </main>
          </SidebarInset>
        </SidebarProvider>

        <DialogHost />
        <AppToaster />
      </ThemeProvider>
    </Provider>
  );
}
