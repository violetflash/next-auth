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

export const getUserById = async (id?: string) => {
  if (!id) {
    return null
  }

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

export const getUserProfile = async (userId?: string) => {
  if (!userId) {
    return null
  }

  const profile = await db.profile.findUnique({
    where: { user_id: userId },
    select: { last_login_at: true }
  });

  try {
    return await db.profile.findUnique({
      where: {
        user_id: userId
      }
    });
  } catch (e) {
    console.log(e)
  }
}

export const getUserLoginTime = async (userId?: string) => {
  if (!userId) {
    return null
  }
  try {
    return await db.profile.findUnique({
      where: { user_id: userId },
      select: { last_login_at: true }
    });
  } catch (e) {
    console.log(e)
  }
};

export const refreshUserLoginTime = async (userId?: string) => {
  if (!userId) {
    return null
  }
  try {
    return await db.profile.update({
      where: { user_id: userId },
      data: { last_login_at: new Date() }
    });
  } catch (e) {
    console.log(e)
  }
}