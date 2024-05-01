'use server';

import { getUserById } from '@/data/user';
import { getCurrentUser } from '@/lib/auth-helpers';
import { db } from '@/lib/db';
import { SettingsSchema } from '@/schemas';
import { z } from 'zod';

export const changeSettings = async (values:  z.infer<typeof SettingsSchema>) => {

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
    values.is_two_factor_enabled = undefined;
  }

  // if exists - update settings
  await db.user.update({
    where: {
      id: dbUser.id
    },
    data: {
      ...values
    }
  });

  return { success: 'Settings updated' }
}