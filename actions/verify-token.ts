'use server';

import { getVerificationTokenByToken } from '@/data/verification-token';
import { db } from '@/lib/db';

export const verifyToken = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) {
    return { error: "Token does not exist." }
  }

  const hasExpired = new Date(existingToken.expires_at) < new Date();

  if (hasExpired) {
    return { error: "Token has expired." }
  }

  const existingUser = await db.user.findUnique({
    where: {
      email: existingToken.email
    }
  })

  if (!existingUser) {
    return { error: "Email does not exist." }
  }

  await db.user.update({
    where: {
      id: existingUser.id
    },
    data: {
      email_verified_at: new Date(),

      // For the change email feature logic:
      // user can change and update his email via generated token and new-verification confirmation
      email: existingToken.email
    }
  });

  await db.verificationToken.delete({
    where: {
      id: existingToken.id
    }
  });

  return { success: 'Email successfully verified!' };
}