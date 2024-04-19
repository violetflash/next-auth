import { db } from '@/lib/db';

export const getUserByEmail = async (email: string) => {
  try {
    return await db.user.findUnique({
      where: {
        email
      }
    });
  } catch (e) {
    console.log(e)
  }
};

export const getUserById = async (id: string) => {
  try {
    return await db.user.findUnique({
      where: {
        id
      }
    });
  } catch (e) {
    console.log(e)
  }
}

export const getUserLoginStats = async (userId?: string) => {
  if (!userId) {
    return null
  }

  try {
    return await db.userLoginStat.findUnique({
      where: {
        userId
      }
    });
  } catch (e) {
    console.log(e)
  }
}