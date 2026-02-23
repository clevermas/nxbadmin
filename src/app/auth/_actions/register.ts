"use server";

import { APIError } from "better-auth/api";

import { routes } from "@/config/routes";

import { createAction } from "@/lib/action";
import { auth } from "@/lib/auth";
import { RegisterSchema } from "@/schemas/auth.schema";

export const registerAction = createAction(
  RegisterSchema,
  async (data, res) => {
    try {
      await auth.api.signUpEmail({
        body: {
          ...data,
          callbackURL: routes.admin,
        },
      });

      return res.success(
        "Registration successful. Please check your email to verify your account",
      );
    } catch (e) {
      if (e instanceof APIError) {
        if (e.status === "UNPROCESSABLE_ENTITY") {
          return res.error("User already exists.");
        }
        if (e.status === "BAD_REQUEST") {
          return res.error("Invalid email.");
        }
      }

      return res.error("Something went wrong");
    }
  },
  { isPublic: true },
);
