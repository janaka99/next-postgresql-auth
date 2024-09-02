"use server";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "@/data/user";
import { getPasswordResetTokenByToken } from "@/data/verification-token";
import { ResetPasswordSchema } from "@/schemas/auth";
import * as z from "zod";
import { db } from "@/lib/database/db";

export const resetPasswordServerAction = async (
  values: z.infer<typeof ResetPasswordSchema>,
  token: string | null
) => {
  try {
    if (!token) {
      return {
        error: "Invalid Token",
      };
    }
    // return {
    //   success: "happpy happy happy",
    // };
    const validatedFields = ResetPasswordSchema.safeParse(values);

    if (!validatedFields.success || !token) {
      return {
        error: "Password reset failed. Please try again.",
      };
    }

    const existingToken = await getPasswordResetTokenByToken(token);
    if (!existingToken) {
      return {
        error: "Invalid Token",
      };
    }

    const isExpired = new Date(existingToken.expires) < new Date();
    if (isExpired) {
      return {
        error: "Invalid Token",
      };
    }

    const existingUser = await getUserByEmail(existingToken.email);
    if (!existingUser) {
      return {
        error: "Invalid Token",
      };
    }

    const hashedPassword = await bcrypt.hash(validatedFields.data.password, 10);

    await db.user.update({
      where: { id: existingUser.id },
      data: { password: hashedPassword },
    });

    await db.passwordResetToken.delete({
      where: { id: existingToken.id },
    });

    return {
      success: "Congratulations! Your password has been reset.",
    };
  } catch (error) {
    return {
      error: "Something Went Wrong!",
    };
  }
};
