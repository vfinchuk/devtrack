'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/shared/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import * as React from 'react';

type BaseButtonProps = Omit<
  React.ComponentProps<typeof Button>,
  'size' | 'children'
>;

export type IconButtonProps = BaseButtonProps & {
  icon: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  asChild?: boolean;
};

const sizeMap = {
  sm: 'h-8 w-8',
  md: 'h-9 w-9',
  lg: 'h-10 w-10',
} as const;

export function IconButton({
  icon,
  size = 'md',
  className,
  asChild,
  variant = 'outline',
  ...props
}: IconButtonProps) {
  const Comp = asChild ? Slot : Button;

  return (
    <Comp
      variant={variant}
      className={cn(
        'flex items-center justify-center p-0',
        sizeMap[size],
        className,
      )}
      {...props}
    >
      {icon}
    </Comp>
  );
}
