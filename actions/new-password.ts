'use server';
import { getResetPasswordTokenByToken } from '@/data/reset-token';
import { getUserByEmail } from '@/data/user';
import { db } from '@/lib/db';
import { NewPasswordSchema } from '@/schemas';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

export const setNewPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token: string | null
) => {

  if (!token) {
    return { error: 'Missing token!' };
  }

  const validated = NewPasswordSchema.safeParse(values);
  if (!validated.success) {
    return { error: 'Invalid password!' };
  }

  const { password } = validated.data;

  const existingToken = await getResetPasswordTokenByToken(token);


  if (!existingToken) {
    return { error: 'Invalid token!' };
  }

  if (new Date(existingToken.expires_at) < new Date()) {
    return { error: 'Token has expired!' };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { error: 'Email does not exist' };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.update({
    where: { id: existingUser.id },
    data: { password: hashedPassword }
  });

  // delete all reset tokens related to this email ?
  await db.resetPasswordToken.deleteMany({
    where: { email: existingToken.email }
  })

  // OR just a single one ?
  // await db.resetPasswordToken.delete({
  //   where: { id: existingToken.id }
  // })

  return {  success: 'Password successfully changed!' };
}