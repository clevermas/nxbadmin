import { z } from "zod";

import { userRoles } from "@/config/const";

export const UserDetailsSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.email({
    error: (issue) => (!issue.input ? "Email is required" : "Invalid email"),
  }),
  role: z.enum(userRoles, {
    message: "Invalid role",
  }),
});

export type UserDetailsSchema = z.infer<typeof UserDetailsSchema>;

const PasswordSchema = z
  .string()
  .min(1, "Password is required")
  .min(8, "Password must be at least 8 characters")
  .max(32, { message: "Password cannot exceed 32 characters" });

const ConfirmPasswordSchema = z.object({
  password: PasswordSchema,
  confirmPassword: PasswordSchema,
});

const passwordMatchChecker = <T extends typeof ConfirmPasswordSchema>(
  schema: T,
) =>
  schema.refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const UserPasswordSchema = passwordMatchChecker(ConfirmPasswordSchema);

export type UserPasswordSchema = z.infer<typeof UserPasswordSchema>;

// Create User
export const CreateUserSchema = passwordMatchChecker(
  z.object({
    ...UserPasswordSchema.shape,
    ...UserDetailsSchema.shape,
  }),
);

export type CreateUserSchema = z.infer<typeof CreateUserSchema>;

// Edit User
export const UpdateUserDetailsSchema = z.object({
  ...UserDetailsSchema.shape,
  userId: z.string().min(1, "User ID is required"),
});

export type UpdateUserDetailsSchema = z.infer<typeof UpdateUserDetailsSchema>;

export const UpdateUserPasswordSchema = passwordMatchChecker(
  z.object({
    ...UserPasswordSchema.shape,
    userId: z.string().min(1, "User ID is required"),
  }),
);

export type UpdateUserPasswordSchema = z.infer<typeof UpdateUserPasswordSchema>;
