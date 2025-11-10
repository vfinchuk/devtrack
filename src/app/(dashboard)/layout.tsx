import type { Metadata } from 'next';
import '../globals.css';

import { requireUserId } from '@/features/auth/server/require-user';
import ClientShell from './client-shell';

export const revalidate = 0;
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: {
    default: 'DevTrack',
    template: '%s · DevTrack',
  },
  description: 'Developers interviews tracking application',
};

export default async function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireUserId();
  return <ClientShell>{children}</ClientShell>;
}
