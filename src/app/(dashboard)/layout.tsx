// app/(private)/layout.tsx
import type { Metadata } from 'next';
import '../globals.css';

import { AppSidebar } from '@/components/layout/app-sidebar';
import Breadcrumbs from '@/components/navigation/breadcrumbs';
import { ModeToggle } from '@/shared/theme/mode-toggle';
import { ThemeProvider } from '@/shared/theme/theme-provider';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/shared/ui/sidebar';
// import { StoreProvider } from '@/providers/StoreProvider' // якщо використовуєш Redux

export const metadata: Metadata = {
  title: {
    default: 'DevTrack',
    template: '%s · DevTrack',
  },
  description: 'Developers interviews tracking application',
};

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <StoreProvider>  {/* розкоментуй, якщо є Redux */}
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
            <ModeToggle /> {/* ← ось тут */}
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
    </ThemeProvider>
    // </StoreProvider>
  );
}
