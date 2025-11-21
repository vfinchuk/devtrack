import {
  getCompaniesRaw,
  getCompaniesWithRelationsRaw,
} from '../services/companies.service';

export async function getCompanies(userId: string) {
  return getCompaniesRaw(userId);
}

export async function getCompaniesWithRelations(userId: string) {
  return getCompaniesWithRelationsRaw(userId);
}
