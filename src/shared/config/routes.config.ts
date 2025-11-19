import {
  BarChart3,
  Building2,
  FileUser,
  LayoutDashboard,
  User2,
} from 'lucide-react';

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
  APPLICATIONS: '/applications',
  COMPANIES: '/companies',
  ANALYTICS: '/analytics',
  PROFILE: '/profile',
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
    name: 'Applications',
    path: ROUTES.APPLICATIONS,
    icon: FileUser,
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
    name: 'Profile',
    path: ROUTES.PROFILE,
    icon: User2,
    auth: true,
  },
];
