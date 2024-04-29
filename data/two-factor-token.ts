import { db } from '@/lib/db';

export const getTwoFactorTokenByTokenId = async (token: string) => {
  try {
    return  await db.twoFactorAuthToken.findUnique({
      where: {
        token,
      }
    })
  } catch (e) {
    return null;
  }
};

export const getTwoFactorTokenByEmail = async (email: string) => {
  try {
    return  await db.twoFactorAuthToken.findFirst({
      where: {
        email,
      }
    })
  } catch (e) {
    return null;
  }
}