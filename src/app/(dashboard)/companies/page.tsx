import { requireUserId } from '@/features/auth/server/require-user';
import { AddCompanyButton } from '@/features/companies/components/add-company-button';
import { DeleteCompanyButton } from '@/features/companies/components/delete-company-button';
import { getCompanies } from '@/features/companies/queries';

export default async function Companies() {
  const userId = await requireUserId();
  const companies = await getCompanies(userId);

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Companies</h1>
        <AddCompanyButton />
      </div>

      {companies.length > 0 ? (
        <ul className="divide-y rounded-md border">
          {companies.map((c) => (
            <li key={c.id} className="flex items-center justify-between p-3">
              <span className="font-medium">{c.name}</span>
              {/* <span className="text-sm text-muted-foreground">
                {new Date(c.createdAt).toLocaleString()}
              </span> */}
              <div>
                <DeleteCompanyButton companyId={c.id} companyName={c.name} />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="rounded-md border p-6 text-sm text-muted-foreground">
          No companies yet. Create your first one.
        </div>
      )}
    </div>
  );
}
