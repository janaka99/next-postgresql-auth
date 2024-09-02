"use server";
import { RegisterSchema } from "@/schemas/auth";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/database/db";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/email/nodemailer";

export const registerServerAction = async (
  values: z.infer<typeof RegisterSchema>
) => {
  try {
    const validatedValues = RegisterSchema.safeParse(values);
    if (!validatedValues.success) {
      return {
        error: "Invalid Fields!",
      };
    }

    const { name, email, password } = validatedValues.data;

    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return { error: "Email already is use!" };
    }

    await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // TODO: Send VErification token email

    const verificationTOken = await generateVerificationToken(email);
    await sendVerificationEmail(
      verificationTOken.email,
      verificationTOken.token
    );
    return {
      success: "Confirmation Email Sent",
    };
  } catch (error) {
    return {
      error: "Invalid Fields!",
    };
  }
};
