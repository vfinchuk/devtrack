import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { Card } from '@/components/ui/card';
import { CreateCompanyButton } from '@/features/companies/components/create-company-button';
import { DeleteCompanyButton } from '@/features/companies/components/delete-company-button';
import { EditCompanyButton } from '@/features/companies/components/edit-company-button';
import { ExternalLink } from '@/shared/ui/external-link';
import { Company } from '@prisma/client';

type CompaniesTableProps = {
  companies: Company[];
};
export function CompaniesTable({ companies }: CompaniesTableProps) {
  const hasCompanies = companies.length > 0;

  return (
    <section className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Companies</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage companies connected to your workspace.
          </p>
        </div>
        <CreateCompanyButton />
      </div>

      <Card className="p-0 overflow-hidden">
        {!hasCompanies ? (
          <div className="text-center py-10 text-sm text-muted-foreground">
            No companies yet. Click “Add company” to create your first one.
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[20%]">Name</TableHead>
                <TableHead className="w-[20%]">Website</TableHead>
                <TableHead className="w-[20%]">Location</TableHead>
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

                  <TableCell className="text-xs text-muted-foreground">
                    {company.createdAt.toLocaleDateString('en-GB', {
                      year: 'numeric',
                      month: 'short',
                      day: '2-digit',
                    })}
                  </TableCell>

                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <EditCompanyButton company={company} />
                      <DeleteCompanyButton
                        id={company.id}
                        name={company.name}
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
