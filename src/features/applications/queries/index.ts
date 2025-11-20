import {
  getApplicationById,
  getApplicationsByUser,
} from '../services/application.service';

export async function getApplications(userId: string) {
  return getApplicationsByUser(userId);
}

export async function getApplication(userId: string, id: string) {
  return getApplicationById(userId, id);
}
