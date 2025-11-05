import { BarChart3, Building2, LayoutDashboard, LogIn, Settings, UserPlus } from 'lucide-react';

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

export const APP_ROUTES: AppRoute[] = [
  // ---- Public ----
  { name: 'Sign In', path: '/sign-in', icon: LogIn, auth: false, showInSidebar: false },
  { name: 'Sign Up', path: '/sign-up', icon: UserPlus, auth: false, showInSidebar: false },

  // ---- Private ----
  {
    name: 'Dashboard',
    path: '/',
    icon: LayoutDashboard,
    auth: true,
    showInSidebar: true,
  },
  {
    name: 'Companies',
    path: '/companies',
    icon: Building2,
    auth: true,
    showInSidebar: true,
  },
  {
    name: 'Analytics',
    path: '/analytics',
    icon: BarChart3,
    auth: true,
    showInSidebar: true,
  },
  {
    name: 'Settings',
    path: '/settings',
    icon: Settings,
    auth: true,
    showInSidebar: true,
    children: [
      {
        name: 'Profile',
        path: '/settings/profile',
        auth: true,
        showInSidebar: true,
      },
    ],
  },
];
