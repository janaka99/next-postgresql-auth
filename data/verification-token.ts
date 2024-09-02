import { db } from "@/lib/database/db";

export const getVerificationTokenByToken = async (token: string) => {
  try {
    const foundToken = await db.verificationTOken.findUnique({
      where: { token },
    });

    return foundToken;
  } catch (error) {
    return null;
  }
};

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const token = await db.verificationTOken.findFirst({
      where: { email },
    });

    return token;
  } catch (error) {
    return null;
  }
};

//  PASSWORD RESET TOKEN

export const getPasswordResetTokenByToken = async (token: string) => {
  try {
    const foundToken = await db.passwordResetToken.findUnique({
      where: { token },
    });

    return foundToken;
  } catch (error) {
    return null;
  }
};

export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    const token = await db.passwordResetToken.findFirst({
      where: { email },
    });

    return token;
  } catch (error) {
    return null;
  }
};

// TWO FACTOR TOKENS

export const getTwoFactorTokenByToken = async (token: string) => {
  try {
    const foundToken = await db.twoFactorToken.findUnique({
      where: { token },
    });

    return foundToken;
  } catch (error) {
    return null;
  }
};

export const deleteAvailableTwoFactorTokens = async (userId: string) => {
  await db.twoFactorToken.deleteMany({
    where: {
      userId: userId,
    },
  });
};

export const getMatchingTwoFactorTokenByUserAndcode = async (
  userId: string,
  code: string
) => {
  try {
    const TwoFACode = await db.twoFactorToken.findUnique({
      where: {
        userId: userId,
        token: code,
      },
    });
    if (TwoFACode) {
      if (new Date(TwoFACode?.expires) < new Date()) {
        return null;
      }
      return TwoFACode;
    }
    return null;
  } catch (error) {
    return null;
  }
};
