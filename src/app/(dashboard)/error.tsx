'use client';

import { Button } from '@/components/ui/button';

export default function DashboardError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="p-10">
      <h2 className="text-xl font-semibold mb-2">Dashboard Error</h2>
      <p className="text-gray-600 mb-4">{error.message}</p>
      <Button onClick={() => reset()}>Reload page</Button>
    </div>
  );
}
