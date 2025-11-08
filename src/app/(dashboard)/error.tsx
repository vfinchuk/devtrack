'use client';

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
      <button
        onClick={() => reset()}
        className="px-4 py-2 border rounded-md bg-white hover:bg-gray-100"
      >
        Reload page
      </button>
    </div>
  );
}
