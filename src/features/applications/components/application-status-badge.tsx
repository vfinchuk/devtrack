import { Badge } from '@/components/ui/badge';
import { formatEnumLabel } from '@/shared/forms/build-enum-options';
import { ApplicationStatus } from '@prisma/client';
import clsx from 'clsx';

const STATUS_COLORS: Record<ApplicationStatus, string> = {
  APPLIED: 'bg-blue-100 text-blue-800 border-blue-200',
  SCREENING: 'bg-purple-100 text-purple-800 border-purple-200',
  INTERVIEW: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  OFFER: 'bg-green-100 text-green-800 border-green-200',
  REJECTED: 'bg-red-100 text-red-800 border-red-200',
  ON_HOLD: 'bg-orange-100 text-orange-800 border-orange-200',
  WITHDRAWN: 'bg-gray-100 text-gray-800 border-gray-300',
};

export function ApplicationStatusBadge({
  status,
}: {
  status: ApplicationStatus;
}) {
  return (
    <Badge
      variant="outline"
      className={clsx('font-medium', STATUS_COLORS[status])}
    >
      {formatEnumLabel(status, 'uppercase')}
    </Badge>
  );
}
