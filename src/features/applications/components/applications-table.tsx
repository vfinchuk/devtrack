import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { routes } from '@/shared/config/routes.config';
import { formatEnumLabel } from '@/shared/forms/build-enum-options';
import { ExternalLink } from '@/shared/ui/external-link';
import { formatDate } from '@/shared/utils/format-date';
import type { Currency } from '@prisma/client';
import clsx from 'clsx';
import Link from 'next/link';
import { ApplicationWithRelations } from '../services/application.service';
import { ApplicationStatusBadge } from './application-status-badge';
import ApplicationTableActions from './application-table-actions';

type ApplicationsTableProps = {
  applications: ApplicationWithRelations[];
};

function formatSalary(
  min: number | null,
  max: number | null,
  currency: Currency,
): string {
  if (min == null && max == null) return '—';

  const cur = currency;
  if (min != null && max != null) return `${min}–${max} ${cur}`;
  if (min != null) return `from ${min} ${cur}`;
  return `up to ${max} ${cur}`;
}

export function ApplicationsTable({ applications }: ApplicationsTableProps) {
  const hasApplications = applications.length > 0;

  return (
    <Card
      className={clsx('flex overflow-auto p-0', {
        'flex-1 items-center justify-center border-none shadow-none':
          !hasApplications,
      })}
    >
      {!hasApplications ? (
        <p className="text-center text-sm text-muted-foreground">
          No applications yet. Click{' '}
          <Button
            asChild
            variant="link"
            className="h-auto p-0 px-0.5 align-baseline"
          >
            <Link href={routes.applications.new}>Create new Application</Link>
          </Button>{' '}
          to create your first one.
        </p>
      ) : (
        <Table>
          <TableHeader className="sticky top-0 z-10 bg-card shadow">
            <TableRow>
              <TableHead>Company</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Salary</TableHead>
              <TableHead>Applied</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {applications.map((application) => (
              <TableRow key={application.id}>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium">
                      {application.company.name}
                    </span>

                    {application.company.website && (
                      <ExternalLink
                        href={application.company.website}
                        normalize
                        className="text-xs text-muted-foreground"
                      />
                    )}
                  </div>
                </TableCell>

                <TableCell className="font-medium">
                  <div className="flex flex-col gap-0.5">
                    <span>{application.role}</span>
                    <span className="text-xs text-muted-foreground">
                      {formatEnumLabel(application.seniority)}
                    </span>
                  </div>
                </TableCell>

                <TableCell>
                  <ApplicationStatusBadge status={application.status} />
                </TableCell>

                <TableCell className="text-sm text-muted-foreground">
                  {formatEnumLabel(application.employmentType)}
                </TableCell>

                <TableCell className="text-sm">
                  {formatSalary(
                    application.salaryMin,
                    application.salaryMax,
                    application.currency,
                  )}
                </TableCell>

                <TableCell className="text-xs text-muted-foreground">
                  {formatDate(application.appliedAt) || 'not set'}
                </TableCell>

                <TableCell className="text-right">
                  <ApplicationTableActions application={application} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Card>
  );
}
