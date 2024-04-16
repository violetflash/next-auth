'use server';

import { RegisterSchema } from '@/schemas';
import { z } from 'zod';

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  // in this action we must validate the values before proceeding
  const validated = RegisterSchema.safeParse(values);

  if (!validated.success) {
    return {  error: "Invalid fields" };
  }

  return { success: "Email sent" };
}