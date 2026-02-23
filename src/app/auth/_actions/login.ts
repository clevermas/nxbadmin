"use server";

import { APIError } from "better-auth/api";

import { createFormAction } from "@/lib/action";
import { auth } from "@/lib/auth";
import { LoginSchema } from "@/schemas/auth.schema";

export const loginAction = createFormAction(
  LoginSchema,
  async (_, data, res) => {
    try {
      await auth.api.signInEmail({ body: data });

      return res.success("Login successful");
    } catch (e) {
      if (e instanceof APIError) {
        if (e.status === "FORBIDDEN" && e.message === "Email not verified") {
          return res.error("Please verify your email address");
        }
      }
      return res.error("Invalid credentials");
    }
  },
  { isPublic: true },
);
