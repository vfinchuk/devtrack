export function formatDate(date: Date | string | number): string {
  if (!date) return '';

  const d = date instanceof Date ? date : new Date(date);
  if (isNaN(d.getTime())) return '';

  return d.toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  });
}
