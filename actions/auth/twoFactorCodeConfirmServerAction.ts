"use server";

import { signOut } from "@/auth";
import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";
import { db } from "@/lib/database/db";

export const tokenVerificationServerAction = async (token: string) => {
  try {
    if (!token) {
      return { error: "Token is not valid 1" };
    }
    const tokenFound = await getVerificationTokenByToken(token);
    if (!tokenFound) {
      return { error: "Token is not valid 2" };
    }
    const hasExpired = new Date(tokenFound.expires) < new Date();

    if (hasExpired) {
      return { error: "Token is not valid 3" };
    }

    const existingUser = await getUserByEmail(tokenFound.email);
    if (!existingUser) {
      return { error: "Email is not valid 4" };
    }

    await db.user.update({
      where: { id: existingUser.id },
      data: {
        emailVerified: new Date(),
        email: tokenFound.email,
      },
    });
    await db.verificationTOken.delete({
      where: { id: tokenFound.id },
    });
    return { success: "Email successfully Verified" };
  } catch (error) {
    return {
      error: "Token is not valid 5",
    };
  }
};
