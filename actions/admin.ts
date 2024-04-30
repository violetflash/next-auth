'use server';
import { getCurrentRole } from '@/lib/auth-helpers';

export const admin = async () => {
  const role = await getCurrentRole();

  if (role !== 'ADMIN') {
    return {
      error: "Access denied",
    }
  }
  return { success: 'Access granted' }
}