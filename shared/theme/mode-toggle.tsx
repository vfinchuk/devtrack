'use client';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import { Laptop, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ModeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // уникаємо блимання іконок до гідрації
  const current = theme === 'system' ? systemTheme : theme;
  const Icon = current === 'dark' ? Moon : current === 'light' ? Sun : Laptop;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" aria-label="Toggle theme" className="relative">
          {/* Іконка поточної теми (без блимання до mount) */}
          {mounted ? <Icon className="h-[1.2rem] w-[1.2rem]" /> : null}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" sideOffset={8}>
        <DropdownMenuItem
          onClick={() => setTheme('light')}
          aria-checked={theme === 'light'}
          role="menuitemradio"
          className={cn('gap-2', theme === 'light' && 'bg-accent')}
        >
          <Sun className="h-4 w-4" />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme('dark')}
          aria-checked={theme === 'dark'}
          role="menuitemradio"
          className={cn('gap-2', theme === 'dark' && 'bg-accent')}
        >
          <Moon className="h-4 w-4" />
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme('system')}
          aria-checked={theme === 'system'}
          role="menuitemradio"
          className={cn('gap-2', theme === 'system' && 'bg-accent')}
        >
          <Laptop className="h-4 w-4" />
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
