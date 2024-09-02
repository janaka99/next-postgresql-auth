import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.MAIL_AUTH_USER,
    pass: process.env.MAIL_PASSWORD,
  },
});

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmationLink = `${process.env.WEBSITE_URL}/auth/verification-req?token=${token}`;

  await transporter.sendMail({
    from: process.env.MAIL_AUTH_USER, // sender address
    to: email, // list of receivers
    subject: "Email Verification", // Subject line
    text: "Please Verify Your Email", // plain text body
    html: `<a href="${confirmationLink}">Verify Email Address</a>`, // html body
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const confirmationLink = `${process.env.WEBSITE_URL}/auth/reset-password?token=${token}`;

  await transporter.sendMail({
    from: process.env.MAIL_AUTH_USER, // sender address
    to: email, // list of receivers
    subject: "Reset Password", // Subject line
    text: "Please Reset you password Using below link", // plain text body
    html: `<a href="${confirmationLink}">Reset Passwords</a>`, // html body
  });
};

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  await transporter.sendMail({
    from: process.env.MAIL_AUTH_USER, // sender address
    to: email, // list of receivers
    subject: "2FA COde", // Subject line
    text: "Your 2FA Code:", // plain text body
    html: `<p>${token}</p>`, // html body
  });
};
