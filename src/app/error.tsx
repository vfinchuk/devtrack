'use client';

import { logger } from '@/core';
import { useEffect } from 'react';

export default function GlobalError(props: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    logger.debug('[GlobalError]', props);
    logger.error(`[GlobalError] ${props.error.message}`);
  }, [props.error]);

  return (
    <html>
      <body className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="max-w-md text-center space-y-4">
          <h2 className="text-2xl font-semibold">Something went wrong</h2>
          <p className="text-gray-600">{props.error.message}</p>
          <button
            onClick={() => props.reset()}
            className="px-4 py-2 rounded-md border bg-white hover:bg-gray-100"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
