import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { Card } from '@/components/ui/card';
import { AddCompanyButton } from '@/features/companies/components/add-company-button';
import { DeleteCompanyButton } from '@/features/companies/components/delete-company-button';
import { EditCompanyButton } from '@/features/companies/components/edit-company-button';

type Company = {
  id: string;
  name: string;
  createdAt: Date;
};

type CompaniesTableProps = {
  companies: Omit<Company, 'ownerId'>[];
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
        <AddCompanyButton />
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
                <TableHead className="w-[40%]">Name</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right w-[1%]">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {companies.map((company) => (
                <TableRow key={company.id}>
                  <TableCell className="font-medium">{company.name}</TableCell>

                  <TableCell className="text-xs text-muted-foreground">
                    {company.createdAt.toLocaleDateString('en-GB', {
                      year: 'numeric',
                      month: 'short',
                      day: '2-digit',
                    })}
                  </TableCell>

                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <EditCompanyButton id={company.id} name={company.name} />
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
