"use server";

import { headers } from "next/headers";

import { createFormAction } from "@/lib/action";
import { auth } from "@/lib/auth";
import { ForgotPasswordSchema } from "@/schemas/auth.schema";

export const forgotPasswordAction = createFormAction(
  ForgotPasswordSchema,
  async (_, data, res) => {
    try {
      await auth.api.requestPasswordReset({
        body: {
          email: data.email,
          redirectTo: "/auth/reset-password",
        },
        headers: await headers(),
      });

      return res.success("Password reset link sent to your email");
    } catch (e) {
      console.error(e);
      return res.success("Password reset link sent to your email");
    }
  },
  { isPublic: true },
);
