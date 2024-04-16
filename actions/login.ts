"use server";
import { LoginSchema } from '@/schemas';
import { z } from 'zod';

export const login = async (values: z.infer<typeof LoginSchema>) => {
  // in this action we must validate the values before proceeding
  const validated = LoginSchema.safeParse(values);


  // we gonna use these errors in the fields components
  if (!validated.success) {
    return {  error: "Invalid fields" };
  }

  return { success: "Email sent" };
}