import { APP_ROUTES } from '@/shared/config/routes.config';
import { renderWithSidebar } from '@/shared/test/test-utils';
import { screen } from '@testing-library/react';
import { vi, type Mock } from 'vitest';
import { AppSidebar } from './app-sidebar';

vi.mock('next/navigation', () => ({
  usePathname: vi.fn(),
}));

import { usePathname } from 'next/navigation';

describe('AppSidebar', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all visible routes from APP_ROUTES', () => {
    (usePathname as Mock).mockReturnValue('/');
    renderWithSidebar(<AppSidebar />);

    APP_ROUTES.filter((r) => r.showInSidebar).forEach((r) => {
      expect(screen.getByText(r.name)).toBeInTheDocument();
    });

    APP_ROUTES.filter((r) => !r.showInSidebar).forEach((r) => {
      expect(screen.queryByText(r.name)).not.toBeInTheDocument();
    });

    // expect(screen.queryByText('Sign In')).not.toBeInTheDocument();
    // expect(screen.queryByText('Sign Up')).not.toBeInTheDocument();
  });

  it('highlights the active route correctly', () => {
    (usePathname as Mock).mockReturnValue('/companies');
    renderWithSidebar(<AppSidebar />);

    const activeLink = screen.getByText('Companies').closest('a');
    expect(activeLink).toHaveAttribute('aria-current', 'page');
  });

  it('render nested children routes (e.g. Settings > Profile)', () => {
    (usePathname as Mock).mockReturnValue('/settings/profile');
    renderWithSidebar(<AppSidebar />);

    expect(screen.getByText('Settings')).toBeInTheDocument();
    expect(screen.getByText('Profile')).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    (usePathname as Mock).mockReturnValue('/');
    const { container } = renderWithSidebar(<AppSidebar />);
    expect(container).toMatchSnapshot();
  });
});
