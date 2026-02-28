import { z } from "zod";

import { StrongPasswordSchema } from "@/schemas/auth.schema";

export const ProfileDetailsSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
});

export type ProfileDetailsSchema = z.infer<typeof ProfileDetailsSchema>;

export const ProfilePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: StrongPasswordSchema,
    confirmPassword: z.string().min(1, "Confirm Password is required"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ProfilePasswordSchema = z.infer<typeof ProfilePasswordSchema>;
