'use server';
import { signOut } from '@/auth';

export const logout = async () => {
  // TODO here we can do some server stuff before logout (clearing some info, etc.)
  await signOut();

}