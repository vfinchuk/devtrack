import { SidebarProvider } from '@/shared/ui/layout/sidebar';
import { render } from '@testing-library/react';
import { ReactNode } from 'react';

export function renderWithSidebar(ui: ReactNode) {
  return render(<SidebarProvider>{ui}</SidebarProvider>);
}
