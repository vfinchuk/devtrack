'use client';

import { Button } from '@/components/ui/button';
import clsx from 'clsx';
import { Loader2 } from 'lucide-react';
import * as React from 'react';

export type LoadingButtonProps = React.ComponentProps<typeof Button> & {
  isLoading?: boolean;
  loadingIconSize?: number;
};

export function LoadingButton({
  isLoading = false,
  loadingIconSize = 16,
  disabled,
  children,
  className,
  ...props
}: LoadingButtonProps) {
  return (
    <Button
      {...props}
      disabled={disabled || isLoading}
      className={clsx('relative', className)}
    >
      <span className={isLoading ? 'opacity-0' : 'opacity-100'}>
        {children}
      </span>

      {isLoading && (
        <span className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Loader2 className="animate-spin" size={loadingIconSize} />
        </span>
      )}
    </Button>
  );
}
