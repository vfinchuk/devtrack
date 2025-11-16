'use client';

import { cn } from '@/shared/lib/utils';
import { normalizeUrl } from '@/shared/utils/normalize-url';

export type ExternalLinkProps = Omit<React.ComponentProps<'a'>, 'href'> & {
  href?: string | null;
  normalize?: boolean;
};

export function ExternalLink({
  href,
  children,
  className,
  normalize = true,
  ...props
}: ExternalLinkProps) {
  if (!href) {
    return <span className={cn('text-muted-foreground', className)}>—</span>;
  }

  const finalUrl = normalize ? normalizeUrl(href) : href;

  return (
    <a
      href={finalUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'text-primary underline underline-offset-4 hover:text-primary/80',
        className,
      )}
      {...props}
    >
      {children ?? href}
    </a>
  );
}
