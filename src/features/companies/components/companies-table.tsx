import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { Card } from '@/components/ui/card';
import { ExternalLink } from '@/shared/ui/external-link';
import { formatDate } from '@/shared/utils/format-date';
import clsx from 'clsx';
import { CompanyWithRelations } from '../services/companies.service';
import { CompaniesTableActions } from './companies-table-actions';
import { CreateCompanyButton } from './create-company-button';

type CompaniesTableProps = {
  companies: CompanyWithRelations[];
};
export function CompaniesTable({ companies }: CompaniesTableProps) {
  const hasCompanies = companies.length > 0;

  return (
    <Card
      className={clsx(`flex overflow-auto p-0`, {
        'border-none shadow-none justify-center items-center': !hasCompanies,
      })}
    >
      {!hasCompanies ? (
        <p className="text-center py-10 text-sm text-muted-foreground">
          No companies yet. Click
          <CreateCompanyButton variant="link" className="p-0 px-0.5 h-auto">
            create new Company
          </CreateCompanyButton>
          to create your first one.
        </p>
      ) : (
        <Table>
          <TableHeader className="sticky top-0 z-10 bg-card ">
            <TableRow>
              <TableHead className="w-[20%]">Name</TableHead>
              <TableHead className="w-[20%]">Website</TableHead>
              <TableHead className="w-[20%]">Location</TableHead>
              <TableHead className="w-[20%]">Applications</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right w-[1%]">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {companies.map((company) => (
              <TableRow key={company.id}>
                <TableCell className="font-medium">{company.name}</TableCell>

                <TableCell className="font-medium">
                  <ExternalLink href={company.website} normalize />
                </TableCell>

                <TableCell className="font-medium">
                  {company.location}
                </TableCell>

                <TableCell className="font-medium">
                  {company.applications.length
                    ? company.applications.length
                    : '-'}
                </TableCell>

                <TableCell className="text-xs text-muted-foreground">
                  {formatDate(company.createdAt)}
                </TableCell>

                <TableCell className="text-right">
                  <CompaniesTableActions company={company} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Card>
  );
}
