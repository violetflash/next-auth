import { db } from '@/lib/db';

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    return db.verificationToken.findFirst({
      where: { email }
    });
  } catch (e) {
    return null;
  }
};

export const getVerificationTokenByToken = async (token: string) => {
  try {
    return db.verificationToken.findUnique({
      where: { token }
    });
  } catch (e) {
    return null;
  }
};