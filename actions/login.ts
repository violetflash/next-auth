"use server";
import { signIn } from '@/auth';
import { getUserByEmail } from '@/data/user';
import { generatedVerificationToken } from '@/lib/tokens';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { LoginSchema } from '@/schemas';
import { AuthError } from 'next-auth';
import { z } from 'zod';

export const login = async (values: z.infer<typeof LoginSchema>) => {
  // in this action we must validate the values before proceeding
  const validated = LoginSchema.safeParse(values);


  // we gonna use these errors in the fields components
  if (!validated.success) {
    return {  error: "Invalid fields" };
  }

  const { email, password } = validated.data;

  const existingUser = await getUserByEmail(email);

  // 1st step of verification - generate verification token
  if (!existingUser || !existingUser.email || !existingUser.password) {
  // log in with OAuth
    return { error: "Email does not exist" };
  }

  if (existingUser && !existingUser.emailVerified) {
    const verificationToken = await generatedVerificationToken(existingUser.email);

    return { success: "Confirmation email sent!" };
  }

  // 2nd step of checking if user verified his email - inside signIn callback (./auth.ts)
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT
    });
  } catch (e) {
    if (e instanceof AuthError) {
      switch (e.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };
        default:
          return { error: "Something went wrong during login" };
      }
    }
    throw e; // mandatory thing for redirection to DEFAULT_LOGIN_REDIRECT logic
  }
}