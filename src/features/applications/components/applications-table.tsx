import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ExternalLink } from '@/shared/ui/external-link';
import type { Currency } from '@prisma/client';

import { Button } from '@/components/ui/button';
import { routes } from '@/shared/config/routes.config';
import { formatEnumLabel } from '@/shared/forms/build-enum-options';
import { formatDate } from '@/shared/utils/format-date';
import { Plus } from 'lucide-react';
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
    <section className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Applications</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Track your job applications across companies and roles.
          </p>
        </div>

        <Button type="button">
          <Link
            className="flex items-center gap-2"
            href={routes.applications.new}
          >
            <Plus className="h-4 w-4" />
            Add new application
          </Link>
        </Button>
      </div>

      <Card className="overflow-hidden p-0">
        {!hasApplications ? (
          <div className="py-10 text-center text-sm text-muted-foreground">
            No applications yet. Click &quot;Add application&quot; to create
            your first one.
          </div>
        ) : (
          <Table>
            <TableHeader>
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
                    <div className="flex flex-col gap-0.5">
                      <span>{application.employmentType}</span>
                    </div>
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
    </section>
  );
}
