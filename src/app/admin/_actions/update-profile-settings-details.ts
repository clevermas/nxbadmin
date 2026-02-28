"use server";

import { headers } from "next/headers";

import { createAction, isLoggedIn } from "@/lib/action";
import { auth } from "@/lib/auth";
import { ProfileDetailsSchema } from "@/schemas/profile.schema";

export const updateProfileSettingsDetailsAction = createAction(
  ProfileDetailsSchema,
  async (data, res) => {
    try {
      await auth.api.updateUser({
        body: {
          name: data.name,
        },
        headers: await headers(),
      });

      return res.success("Profile updated successfully");
    } catch (e) {
      console.error(e);
      return res.error("Failed to update profile");
    }
  },
  {
    onCheckAccess: isLoggedIn,
  },
);
