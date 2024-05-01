'use server';
import { getUserById } from '@/data/user';
import { getCurrentUser } from '@/lib/auth-helpers';
import { db } from '@/lib/db';
import { PasswordsSchema } from '@/schemas';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

export const changePassword = async (values: z.infer<typeof PasswordsSchema>) => {
  // at first - check if user is authenticated
  const user = await getCurrentUser();

  if (!user) {
    return { error: 'Unauthorized' };
  }

  // also check if authenticated user exists in db
  const dbUser  = await getUserById(user.id);

  if (!dbUser) {
    return { error: 'User not found' };
  }


  if (user.is_oauth) {
    // USERS WITH OAUTH ARE NOT ALLOWED TO CHANGE THIS FIELDS
    values.password = undefined;
    values.newPassword = undefined;
  }

  if (values.password && values.newPassword && dbUser.password) {
    const isValid = await bcrypt.compare(values.password, dbUser.password);

    if (!isValid) {
      return { error: 'Incorrect password' };
    }

    values.password = await bcrypt.hash(values.newPassword, 10);
    values.newPassword = undefined; // we don't have this field in db
  }

  // if exists - update password
  await db.user.update({
    where: {
      id: dbUser.id
    },
    data: {
      ...values
    }
  });

  return { success: 'Password updated' }
}