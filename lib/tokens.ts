import {
  deleteAvailableTwoFactorTokens,
  getVerificationTokenByEmail,
} from "@/data/verification-token";
import { v4 as uuid } from "uuid";
import { db } from "./database/db";
import crypto from "crypto";

export const generateVerificationToken = async (email: string) => {
  const token = uuid();
  const expires = new Date(new Date().getTime() + 3600 * 1000 * 24);

  const existingToken = await getVerificationTokenByEmail(email);
  if (existingToken) {
    await db.verificationTOken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const verificationToken = await db.verificationTOken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return verificationToken;
};

export const generatePasswordResetToken = async (email: string) => {
  const token = uuid();
  const expires = new Date(new Date().getTime() + 3600 * 1000 * 24);

  const existingToken = await getVerificationTokenByEmail(email);
  if (existingToken) {
    await db.passwordResetToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const verificationToken = await db.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return verificationToken;
};

export const generateTwoFactorToken = async (userId: string) => {
  const token = crypto.randomInt(100000, 1000000).toString();
  const expires = new Date(new Date().getTime() + 3600 * 1000 * 6);

  await deleteAvailableTwoFactorTokens(userId);
  const verificationToken = await db.twoFactorToken.create({
    data: {
      token,
      expires,
      userId,
    },
  });

  return verificationToken;
};
