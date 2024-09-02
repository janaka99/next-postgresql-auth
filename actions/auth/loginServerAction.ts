"use server";
import { signIn } from "@/auth";
import { getUserByEmail } from "@/data/user";

import { db } from "@/lib/database/db";
import {
  sendTwoFactorTokenEmail,
  sendVerificationEmail,
} from "@/lib/email/nodemailer";
import {
  generateTwoFactorToken,
  generateVerificationToken,
} from "@/lib/tokens";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schemas/auth";
import { AuthError } from "next-auth";
import * as z from "zod";

export const loginServerAction = async (
  values: z.infer<typeof LoginSchema>
) => {
  try {
    const validatedValues = LoginSchema.safeParse(values);
    if (!validatedValues.success) {
      return {
        error: "Invalid Fields!",
      };
    }
    const { email, password, code } = validatedValues.data;

    const exisitingUser = await getUserByEmail(email);

    if (!exisitingUser || !exisitingUser.email || !exisitingUser.password) {
      return {
        error: "Invalid Credentials! 1",
      };
    }
    if (!exisitingUser.emailVerified) {
      const verificationtoken = await generateVerificationToken(
        exisitingUser.email
      );
      await sendVerificationEmail(
        verificationtoken.email,
        verificationtoken.token
      );

      return { success: "Confirmation Email Has been sent" };
    }

    try {
      const response = await signIn("credentials", {
        email,
        password,
        code,
        redirectTo: DEFAULT_LOGIN_REDIRECT,
      });
      console.log("CREDENTIALS RESPONSE ", response);
    } catch (error) {
      console.log("Auth error found ", error);
      if (error instanceof AuthError) {
        switch (error.type) {
          case "CredentialsSignin":
            return {
              error: "Invalid Credentials! 3",
            };
          default:
            return {
              error: "Something Went Wrong! Try Again Later",
            };
        }
      }
      return {
        error: "Something Went Wrong! Try Again Later",
      };
    }
  } catch (error) {
    console.log("error found from outer space ", error);

    return {
      error: "Something Went Wrong! Try Again Later",
    };
  }
};
