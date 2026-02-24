"use server";

import { APIError } from "better-auth/api";
import { headers } from "next/headers";
import { z } from "zod";

import { createFormAction } from "@/lib/action";
import { auth } from "@/lib/auth";
import { ResetPasswordSchema } from "@/schemas/auth.schema";

const ResetPasswordActionSchema = ResetPasswordSchema.extend({
  token: z.string(),
});

export const resetPasswordAction = createFormAction(
  ResetPasswordActionSchema,
  async (_, data, res) => {
    try {
      await auth.api.resetPassword({
        body: {
          newPassword: data.password,
          token: data.token,
        },
        headers: await headers(),
      });

      return res.success("Password reset successful");
    } catch (e) {
      if (e instanceof APIError) {
        return res.error(e.message);
      }
      return res.error("Failed to reset password");
    }
  },
  { isPublic: true },
);
