"use server";

import { getUserByEmail } from "@/data/user";
import { sendPasswordResetEmail } from "@/lib/email/nodemailer";
import { generatePasswordResetToken } from "@/lib/tokens";
import { ForgotPasswordSchema } from "@/schemas/auth";
import { error } from "console";
import * as z from "zod";

export const forgotPasswordServerAction = async (
  values: z.infer<typeof ForgotPasswordSchema>
) => {
  try {
    const validatedField = ForgotPasswordSchema.safeParse(values);

    if (!validatedField.success) {
      return {
        error: "Email validation failed",
      };
    }
    const { email } = validatedField.data;

    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
      return {
        error: "Email not found!",
      };
    }

    const token = await generatePasswordResetToken(email);
    if (!token) {
      return {
        error: "Something Went Wrong",
      };
    }
    await sendPasswordResetEmail(token.email, token.token);

    return {
      success: "Password Reset Email Sent",
    };
  } catch (error) {
    return { error: "Something Went Wrong!" };
  }
};
