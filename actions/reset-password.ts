'use server';

import { getUserByEmail } from '@/data/user';
import { sendResetPasswordEmail } from '@/lib/mail';
import { generateResetPasswordToken } from '@/lib/tokens';
import { ResetPasswordSchema } from '@/schemas';
import { z } from 'zod';

export const resetPassword = async (values: z.infer<typeof ResetPasswordSchema>) => {

  const validated = ResetPasswordSchema.safeParse(values);

  if (!validated.success) {
    return { error: 'Invalid email!' };
  }

  const { email  } = validated.data;
  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return { error: 'Email does not exist' };
  }

  // TODO generate reset token and send email
  const newResetPasswordToken = await generateResetPasswordToken(email);
  await sendResetPasswordEmail({
    email: newResetPasswordToken.email,
    token: newResetPasswordToken.token
  });

  return { success: 'Reset email sent' };
}