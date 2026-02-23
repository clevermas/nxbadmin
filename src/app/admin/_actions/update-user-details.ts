"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

import { routes } from "@/config/routes";

import { createAction } from "@/lib/action";
import { userNotFound } from "@/lib/admin";
import { auth } from "@/lib/auth";
import { UpdateUserDetailsSchema } from "@/schemas/user-admin.schema";

export const updateUserDetailsAction = createAction(
  UpdateUserDetailsSchema,
  async (data, res) => {
    try {
      const { userId, ...updateData } = data;

      await auth.api.getUser({
        query: {
          id: userId,
        },
        headers: await headers(),
      });

      await auth.api.adminUpdateUser({
        body: {
          userId,
          data: updateData,
        },
        headers: await headers(),
      });

      revalidatePath(routes.adminUserManage(data.userId));

      return res.success("User updated successfully");
    } catch (e) {
      if (userNotFound(e, res)) return;

      console.error(e, data);
      return res.error("Failed to update user");
    }
  },
);
