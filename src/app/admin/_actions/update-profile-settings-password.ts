"use server";

import { APIError } from "better-auth";
import { headers } from "next/headers";

import { createAction, isLoggedIn } from "@/lib/action";
import { auth } from "@/lib/auth";
import { ProfilePasswordSchema } from "@/schemas/profile.schema";

export const updateProfileSettingsPasswordAction = createAction(
  ProfilePasswordSchema,
  async (data, res) => {
    try {
      await auth.api.changePassword({
        body: {
          currentPassword: data.currentPassword,
          newPassword: data.newPassword,
        },
        headers: await headers(),
      });

      return res.success("Password changed successfully");
    } catch (e) {
      console.error(e);

      if (e instanceof APIError) {
        if (e.status === "BAD_REQUEST") {
          return res.error("Invalid password");
        }
      }
      return res.error("Failed to change password");
    }
  },
  {
    onCheckAccess: isLoggedIn,
  },
);
