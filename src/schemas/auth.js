import { z } from "zod";

export const signUpSchema = z
  .object({
    email: z
      .string({
        required_error: "📧 Email is required",
        invalid_type_error: "📧 Email must be a string",
      })
      .email("📧 Must be a valid email address"),

    fullName: z
      .string({
        required_error: "👤 Full Name is required",
      })
      .min(3, "👤 Full Name must be at least 3 characters long")
      .max(50, "👤 Full Name must not exceed 50 characters"),

    password: z
      .string({
        required_error: "🔑 Password is required",
      })
      .min(8, "🔑 Password must be at least 8 characters long")
      .regex(/[a-z]/, "🔑 Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "🔑 Password must contain at least one number"),

    confirmPassword: z
      .string({
        required_error: "🔑 Confirm Password is required",
      })
      .min(1, "🔑 Confirm Password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "🔑 Passwords do not match.",
    path: ["confirmPassword"],
  });

export const signInSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
});

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(/[0-9]/, { message: "Must contain at least one number" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const verifyOtpSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email("Invalid email address"),

  otp: z
    .string({
      required_error: "OTP is required",
      invalid_type_error: "OTP must be a string",
    })
    .min(6, "OTP must be 6 characters")
    .max(6, "OTP must be 6 characters"),
});

export const changePasswordSchema = z.object({
  body: z
    .object({
      oldPassword: z.string().min(1, "Old password is required."),
      newPassword: z.string().min(8, "New password must be at least 8 characters long."),
      confirmPassword: z.string().min(1, "Please confirm your new password."),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: "New password and confirm password do not match.",
      path: ["confirmPassword"],
    }),
});
