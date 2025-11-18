import { getCompaniesByOwner } from '../services/companies.service';

export async function getCompanies(userId: string) {
  return getCompaniesByOwner(userId);
}
