import { BarChart3, Building2, LayoutDashboard, Settings } from 'lucide-react';

export type AppRoute = {
  name: string;
  path: string;
  icon?: React.ComponentType<{ className?: string }>;
  auth?: boolean;
  showInSidebar?: boolean;
  hidden?: boolean;
  children?: AppRoute[];
  parent?: string;
};

export const ROUTES = {
  AUTH: '/auth',

  DASHBOARD: '/',
  COMPANIES: '/companies',
  ANALYTICS: '/analytics',

  SETTINGS: '/settings',
  SETTINGS_PROFILE: '/settings/profile',
} as const;

export const APP_ROUTES: AppRoute[] = [
  {
    name: 'Authentication',
    path: ROUTES.AUTH,
    auth: false,
    showInSidebar: false,
  },

  // ---- Private ----
  {
    name: 'Dashboard',
    path: ROUTES.DASHBOARD,
    icon: LayoutDashboard,
    auth: true,
    showInSidebar: true,
  },
  {
    name: 'Companies',
    path: ROUTES.COMPANIES,
    icon: Building2,
    auth: true,
    showInSidebar: true,
  },
  {
    name: 'Analytics',
    path: ROUTES.ANALYTICS,
    icon: BarChart3,
    auth: true,
    showInSidebar: true,
  },
  {
    name: 'Settings',
    path: ROUTES.SETTINGS,
    icon: Settings,
    auth: true,
    showInSidebar: true,
    children: [
      {
        name: 'Profile',
        path: ROUTES.SETTINGS_PROFILE,
        auth: true,
        showInSidebar: true,
      },
    ],
  },
];
