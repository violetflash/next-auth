import { db } from '@/lib/db';

export const get2FAConfirmationByUserId = async (userId: string) => {
  try {
    return  await db.twoFactorConfirmation.findUnique({
      where: {
        user_id: userId,
      }
    })
  } catch (e) {
    return null;
  }
}