'use server';

import { db } from '@/lib/db';
import { RegisterSchema } from '@/schemas';
import { z } from 'zod';
import bcrypt from 'bcrypt';

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  // in this action we must validate the values before proceeding
  const validated = RegisterSchema.safeParse(values);

  if (!validated.success) {
    return {  error: "Invalid fields" };
  }

  const { password, email, name } = validated.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await db.user.findUnique({
    where: {
      email
    }
  });

  if (existingUser) {
    return { error: "Email already in use" };
  }

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword
    }
  });

  //TODO Send verification token email

  return { success: "User created!" };
}