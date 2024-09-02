import GitHub from "next-auth/providers/github";
import type { NextAuthConfig } from "next-auth";
import credentials from "next-auth/providers/credentials";
import { LoginSchema } from "./schemas/auth";
import { getUserByEmail } from "./data/user";
import bcrypt from "bcryptjs";
import github from "next-auth/providers/github";
import { getMatchingTwoFactorTokenByUserAndcode } from "./data/verification-token";
import { generateTwoFactorToken } from "./lib/tokens";
import { sendTwoFactorTokenEmail } from "./lib/email/nodemailer";

export default {
  providers: [
    github({
      clientId: process.env.GIHUB_CLIENT_ID,
      clientSecret: process.env.HITHUB_CLIENT_SECRET,
    }),
    credentials({
      async authorize(credentials) {
        const validatedValues = LoginSchema.safeParse(credentials);

        if (validatedValues.success) {
          const { email, password, code } = validatedValues.data;
          console.log("Code recieved ", code);
          const user = await getUserByEmail(email);
          if (!user || !user.password) return null;

          // check if the password match
          const isMatch = await bcrypt.compare(password, user.password);
          if (isMatch && !user.isTwoFactorEnabled) {
            return user;
          } else if (isMatch && user.email && code) {
            // check if userConfirmationTOken Available on the databse
            const existingConfirmation =
              await getMatchingTwoFactorTokenByUserAndcode(user.id, code);
            if (existingConfirmation) {
              return user;
            } else {
              return null;
            }
          } else if (isMatch && user.email && !code) {
            // send 2factor code to the user and
            const token = await generateTwoFactorToken(user.id);
            if (!token) {
              throw new Error("2FA_INVALID");
            }

            await sendTwoFactorTokenEmail(user.email, token.token);
            throw new Error("2FA_SEND");
          }
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
