'use client';

import { Switch } from '@/components/ui/switch';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useMemo, useState } from 'react';

type ModeToggleProps = {
  label?: string;
};

export function ModeToggle({ label = 'Appearance' }: ModeToggleProps) {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const { isDark, ariaLabel, Icon, nextTheme } = useMemo(() => {
    const current = theme === 'system' ? resolvedTheme : theme;
    const dark = current === 'dark';
    const target = dark ? 'light' : 'dark';
    return {
      isDark: dark,
      ariaLabel: `Switch to ${target} mode`,
      Icon: dark ? Moon : Sun,
      nextTheme: target,
    };
  }, [theme, resolvedTheme]);

  if (!mounted) return null;

  return (
    <div
      className="flex w-full items-center justify-between gap-2 text-left cursor-pointer"
      onClick={() => setTheme(nextTheme)}
    >
      <div className="flex items-center gap-2 text-sm">
        <Icon className="size-4" />
        <span>{label}</span>
      </div>
      <Switch
        checked={isDark}
        onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
        aria-label={ariaLabel}
      />
    </div>
  );
}
