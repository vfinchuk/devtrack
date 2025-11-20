import { Badge } from '@/components/ui/badge';
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
import type { Application, Company, Currency } from '@prisma/client';

import { Button } from '@/components/ui/button';
import { ROUTES } from '@/shared/config/routes.config';
import { formatDate } from '@/shared/utils/format-date';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { DeleteApplicationButton } from './delete-application-button';
import { EditApplicationButton } from './edit-application-button';

type ApplicationWithCompany = Application & {
  company: Pick<Company, 'id' | 'name' | 'website'>;
};

type ApplicationsTableProps = {
  applications: ApplicationWithCompany[];
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
            href={`${ROUTES.APPLICATIONS}/new`}
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
                <TableHead>Timeline</TableHead>
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
                    {application.role}
                  </TableCell>

                  <TableCell>
                    <Badge variant="outline" className="uppercase">
                      {application.status}
                    </Badge>
                  </TableCell>

                  <TableCell className="text-sm text-muted-foreground">
                    <div className="flex flex-col gap-0.5">
                      <span>{application.employmentType}</span>
                      <span className="text-xs uppercase">
                        {application.seniority}
                      </span>
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
                    <div className="flex flex-col gap-0.5">
                      <span>
                        Applied:{' '}
                        {formatDate(application.appliedAt) || 'not set'}
                      </span>
                      <span>
                        Last activity:{' '}
                        {formatDate(application.lastActivityAt) || 'not set'}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <EditApplicationButton application={application} />
                      <DeleteApplicationButton
                        id={application.id}
                        role={application.role}
                        // companyName={application.company.name}
                      />
                    </div>
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
