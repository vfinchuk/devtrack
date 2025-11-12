'use client';

import { Button } from '@/shared/ui/button';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  if (!theme) return null;

  const isDark = theme === 'dark';
  const Icon = isDark ? Moon : Sun;
  const nextTheme = isDark ? 'light' : 'dark';
  const label = `Switch to ${nextTheme} mode`;

  return (
    <Button
      variant="outline"
      size="icon"
      aria-label={label}
      onClick={() => setTheme(nextTheme)}
    >
      <Icon className="h-[1.2rem] w-[1.2rem]" />
    </Button>
  );
}
