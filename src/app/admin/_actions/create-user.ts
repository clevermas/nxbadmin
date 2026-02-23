"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

import { routes } from "@/config/routes";

import { createAction } from "@/lib/action";
import { auth } from "@/lib/auth";
import { CreateUserSchema } from "@/schemas/user-admin.schema";

export const createUserAction = createAction(
  CreateUserSchema,
  async (data, res) => {
    try {
      await auth.api.createUser({
        body: {
          name: data.name,
          email: data.email,
          role: data.role,
          password: data.password,
        },
        headers: await headers(),
      });

      revalidatePath(routes.admin);

      return res.success("User created successfully");
    } catch (error) {
      console.error(error);
      return res.error("Failed to create user");
    }
  },
);
