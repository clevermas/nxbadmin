"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { z } from "zod";

import { routes } from "@/config/routes";

import { createAction } from "@/lib/action";
import { userNotFound } from "@/lib/admin";
import { auth } from "@/lib/auth";

const RemoveUserSchema = z.object({
  userId: z.string(),
});

export const removeUserAction = createAction(
  RemoveUserSchema,
  async (data, res) => {
    try {
      const session = await auth.api.getSession({
        headers: await headers(),
      });

      if (session?.user.id === data.userId) {
        return res.error("Cannot delete yourself");
      }

      await auth.api.removeUser({
        body: {
          userId: data.userId,
        },
        headers: await headers(),
      });

      revalidatePath(routes.admin);

      return res.success("User removed successfully");
    } catch (e) {
      if (userNotFound(e, res)) return;

      console.error(e);
      return res.error("Failed to remove user");
    }
  },
);
