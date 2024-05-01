'use server';

import { getUserByEmail } from '@/data/user';
import { db } from '@/lib/db';
import { sendVerificationEmail } from '@/lib/mail';
import { generateVerificationToken } from '@/lib/tokens';
import { RegisterSchema } from '@/schemas';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  // in this action we must validate the values before proceeding
  const validated = RegisterSchema.safeParse(values);

  if (!validated.success) {
    return {  error: "Invalid fields" };
  }

  const { password, email, name } = validated.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already in use" };
  }

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      profile: {
        create: {
          last_login_at: new Date(),
        }
      }
    }
  });

  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail({
    email: verificationToken.email,
    token: verificationToken.token
  });



  return { success: "Confirmation email sent" };
}