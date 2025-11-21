'use client';

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2,
  OctagonXIcon,
  TriangleAlertIcon,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import type { ToasterProps } from 'sonner';
import { Toaster as SonnerToaster } from 'sonner';
import { APP_TOAST_DURATION } from '../config/app.config';

export function AppToaster(props: ToasterProps) {
  const { theme = 'system' } = useTheme();

  return (
    <SonnerToaster
      theme={theme as ToasterProps['theme']}
      position="top-right"
      richColors
      expand
      // closeButton
      duration={APP_TOAST_DURATION}
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon />,
        loading: <Loader2 className="size-4 animate-spin" />,
      }}
      toastOptions={{
        classNames: {
          title: 'text-sm',
          toast: 'border bg-popover text-popover-foreground shadow gap-5!',
          content: 'gap-2!',
        },
      }}
      {...props}
    />
  );
}
