import { db } from '@/lib/db';

export const getResetPasswordTokenByToken = async (token: string) => {
  try {
    return await db.resetPasswordToken.findUnique({
      where: { token }
    })
  } catch (err) {
    return null;
  }
};


export const getResetPasswordTokenByEmail = async (email: string) => {
  try {
    return await db.resetPasswordToken.findFirst({
      where: { email }
    })
  } catch (err) {
    return null;
  }
}