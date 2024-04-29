"use server";
import { signIn } from '@/auth';
import { get2FAConfirmationByUserId } from '@/data/two-factor-cinfirmation';
import { getTwoFactorTokenByEmail } from '@/data/two-factor-token';
import { getUserByEmail } from '@/data/user';
import { db } from '@/lib/db';
import { sendTwoFactorTokenEmail, sendVerificationEmail } from '@/lib/mail';
import { DEFAULT_LOGIN_REDIRECT } from '@/lib/routes-constants';
import { generateTwoFactorToken, generateVerificationToken } from '@/lib/tokens';
import { LoginSchema } from '@/schemas';
import { AuthError } from 'next-auth';
import { z } from 'zod';

export const login = async (values: z.infer<typeof LoginSchema>) => {
  // in this action we must validate the values before proceeding
  const validated = LoginSchema.safeParse(values);


  // we're going to use these errors in the fields components
  if (!validated.success) {
    return {error: "Invalid fields"};
  }

  const {email, password, code} = validated.data;

  const existingUser = await getUserByEmail(email);

  // 1st step of verification - generate verification token
  if (!existingUser || !existingUser.email || !existingUser.password) {
    // log in with OAuth
    return {error: "Email does not exist"};
  }


  if (existingUser && !existingUser.email_verified_at) {
    const verificationToken = await generateVerificationToken(existingUser.email);

    await sendVerificationEmail(verificationToken.email, verificationToken.token);
    return {success: "Confirmation email sent!"};
  }

  // 2nd step of checking if user has 2FA enabled and verified his login - inside signIn callback (./auth.ts)
  if (existingUser.is_two_factor_enabled && existingUser.email) {
    if (code) {
      // TODO verify code
      // if we already sent 2FA code and form already provided code field
      const existingTwoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);
      if (!existingTwoFactorToken) {
        return {error: "Invalid code!"};
      }
      if (existingTwoFactorToken.token !== code) {
        return {error: "Invalid code!"};
      }
      const hasExpired = new Date(existingTwoFactorToken.expires_at) < new Date();
      if (hasExpired) {
        return {error: "Code has expired!"};
      }

      await db.twoFactorAuthToken.delete({
        where: {
          id: existingTwoFactorToken.id
        }
      });

      const existing2FAConfirmation = await get2FAConfirmationByUserId(existingUser.id);
      if (existing2FAConfirmation) {
        await db.twoFactorConfirmation.delete({
          where: {
            id: existing2FAConfirmation.id
          }
        });
      }

      // Finally create 2FA confirmation for the user (this one will be checked in the SignIn callback)
      await db.twoFactorConfirmation.create({
        data: {
          user_id: existingUser.id
        }
      })
    } else {
      const newTwoFactorToken = await generateTwoFactorToken(existingUser.email);
      await sendTwoFactorTokenEmail(newTwoFactorToken.email, newTwoFactorToken.token);
      return {twoFactor: true}; // special object for 2FA to display the 2FA form
    }
  }

  // 3rd step of checking if user verified his email - inside signIn callback (./auth.ts)
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
          return {error: "Invalid credentials"};
        default:
          return {error: "Something went wrong during login"};
      }
    }
    throw e; // mandatory thing for redirection to DEFAULT_LOGIN_REDIRECT logic
  }
}