'use server';

import { getUserByEmail, getUserById } from '@/data/user';
import { getCurrentUser } from '@/lib/auth-helpers';
import { sendVerificationEmail } from '@/lib/mail';
import { generateVerificationToken } from '@/lib/tokens';
import { EmailSchema } from '@/schemas';
import { z } from 'zod';

export const changeEmail = async (values:  z.infer<typeof EmailSchema>) => {

  const validated = EmailSchema.safeParse(values);

  if (!validated.success) {
    return {error: "Invalid email"};
  }

  const { email } = validated.data;

  // values.email = validated.data.email;

  // at first - check if user is authenticated
  const user = await getCurrentUser();

  if (!user) {
    return { error: 'Unauthorized' };
  }

  if (user.is_oauth) {
    // USERS WITH OAUTH ARE NOT ALLOWED TO CHANGE THIS FIELDS
    return { error: 'Oauth users are not allowed to change email' };
  }

  // also check if authenticated user exists in db
  const dbUser  = await getUserById(user.id);
  if (!dbUser) {
    return { error: 'User not found' };
  }

  if (values && email === dbUser.email) {
    return { error: 'New email must not be the same as the old one.' };
  }

  // if correct email and it's not the same
  // check if email already in use by another user
  const existingUser = await getUserByEmail(values.email);

  if (existingUser && existingUser.id !== dbUser.id) {
    return { error: 'Email already in use' };
  }

  // email is not in use by another user
  const verificationToken = await generateVerificationToken(values.email);
  await sendVerificationEmail({
    email: verificationToken.email,
    token: verificationToken.token
  });

  return { success: 'Confirmation email sent' };
}