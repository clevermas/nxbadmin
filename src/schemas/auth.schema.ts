import { z } from "zod";

export const LoginSchema = z.object({
  email: z
    .email({
      error: (issue) => (!issue.input ? "Email is required" : "Invalid email"),
    })
    .trim()
    .toLowerCase(),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, { message: "Password be at least 8 characters" })
    .max(32, { message: "Password cannot exceed 32 characters" }),
});

export type LoginSchema = z.infer<typeof LoginSchema>;

export const RegisterSchema = z.object({
  email: z
    .email({
      error: (issue) => (!issue.input ? "Email is required" : "Invalid email"),
    })
    .trim()
    .toLowerCase(),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/[0-9]/, { message: "Password must include 1 number" })
    .regex(/[a-z]/, {
      message: "Password must include 1 lowercase letter",
    })
    .regex(/[A-Z]/, {
      message: "Password must include 1 uppercase letter",
    }),
  name: z
    .string()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(100, { message: "Name cannot exceed 100 characters" }),
});

export type RegisterSchema = z.infer<typeof RegisterSchema>;
