import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is rrequired",
  }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
  name: z.string().min(1, {
    message: "Name is required",
  }),
});

export const ForgotPasswordSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

export const ResetPasswordSchema = z
  .object({
    password: z.string().min(6, {
      message: "Minimum of 6 characters required",
    }),
    confirm_password: z.string().min(6),
  })
  .superRefine((data, ctx) => {
    if (data.confirm_password !== data.password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["confirm_password"],
      });
    }
  });

//   file: z.custom(
//     (file) => {
//       if (!file) return false;

//       // Validate file type
//       const validTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
//       if (!validTypes.includes(file.mimetype)) {
//         return false;
//       }

//       // Validate file size (e.g., 2MB max)
//       const maxSize = 2 * 1024 * 1024; // 2 MB
//       if (file.size > maxSize) {
//         return false;
//       }

//       return true;
//     },
//     {
//       message:
//         "Invalid file. Only PNG ,webp ,JPG and JPEG files are allowed, and the file size must be less than 2MB.",
//     }
//   ),
// });
