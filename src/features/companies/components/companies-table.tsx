'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ExternalLink } from '@/shared/ui/external-link';
import { IconButton } from '@/shared/ui/icon-button';
import { Company } from '@prisma/client';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { useCompanyDialogs } from '../dialogs/use-company-dialog';

type CompaniesTableProps = {
  companies: Company[];
};
export function CompaniesTable({ companies }: CompaniesTableProps) {
  const {
    openCreateCompanyDialog,
    openEditCompanyDialog,
    openDeleteCompanyDialog,
  } = useCompanyDialogs();
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
        <Button
          type="button"
          onClick={() => openCreateCompanyDialog()}
          startIcon={<Plus />}
        >
          Add new company
        </Button>
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
                      <IconButton
                        size="sm"
                        variant="outline"
                        icon={<Pencil />}
                        onClick={() => openEditCompanyDialog({ company })}
                      />
                      <IconButton
                        size="sm"
                        variant="destructive"
                        icon={<Trash2 />}
                        onClick={() => openDeleteCompanyDialog({ company })}
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
