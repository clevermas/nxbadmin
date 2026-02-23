"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

import { routes } from "@/config/routes";

import { createAction } from "@/lib/action";
import { userNotFound } from "@/lib/admin";
import { auth } from "@/lib/auth";
import { UpdateUserPasswordSchema } from "@/schemas/user-admin.schema";

export const updateUserPasswordAction = createAction(
  UpdateUserPasswordSchema,
  async (data, res) => {
    try {
      await auth.api.getUser({
        query: {
          id: data.userId,
        },
        headers: await headers(),
      });

      await auth.api.setUserPassword({
        body: {
          userId: data.userId,
          newPassword: data.password,
        },
        headers: await headers(),
      });

      revalidatePath(routes.adminUserManage(data.userId));

      return res.success("Password updated successfully");
    } catch (e) {
      if (userNotFound(e, res)) return;

      console.error(e);
      return res.error("Failed to update password");
    }
  },
);
