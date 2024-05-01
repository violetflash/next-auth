import { db } from '@/lib/db';

export const getAccountByUserId = async (userId: string) => {
  try {
    return db.account.findFirst({
      where: {
        userId
      }
    })
  } catch (e) {
    return null;
  }
}