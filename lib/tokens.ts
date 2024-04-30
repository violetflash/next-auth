import { getResetPasswordTokenByEmail } from '@/data/reset-token';
import { getTwoFactorTokenByEmail } from '@/data/two-factor-token';
import { getVerificationTokenByEmail } from '@/data/verification-token';
import { db } from '@/lib/db';
import * as crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  // TODO Change expiration time to 15 minutes
  const expiresAt = new Date(new Date().getTime() + 3600 * 1000); // 1 hour
  const existingToken = await getVerificationTokenByEmail(email);

  // anytime we generate a new token, we delete the old one
  if (existingToken) {
    await db.verificationToken.delete({
      where: {
        id: existingToken.id
      }
    })
  }

  return db.verificationToken.create({
    data: {
      email,
      token,
      expires_at: expiresAt
    }
  });
};

export const generateResetPasswordToken = async (email: string) => {
  const token = uuidv4();
  // TODO Change expiration time to 15 minutes
  const expiresAt = new Date(new Date().getTime() + 3600 * 1000); // 1 hour
  const existingToken = await getResetPasswordTokenByEmail(email);

  // anytime we generate a new token, we delete the old one
  if (existingToken) {
    await db.resetPasswordToken.delete({
      where: {
        id: existingToken.id
      }
    })
  }

  return db.resetPasswordToken.create({
    data: {
      email,
      token,
      expires_at: expiresAt
    }
  });
};

export const generateTwoFactorToken = async (email: string) => {
  const token = crypto.randomInt(100_000, 1_000_000).toString();
  // 5 minutes
  const expiresAt = new Date(new Date().getTime() + 5 * 60 * 1000); // 5 minutes
  const existingToken = await getTwoFactorTokenByEmail(email);

  // anytime we generate a new token, we delete the old one
  if (existingToken) {
    await db.twoFactorAuthToken.delete({
      where: {
        id: existingToken.id
      }
    })
  }

  return db.twoFactorAuthToken.create({
    data: {
      email,
      token,
      expires_at: expiresAt
    }
  })
}