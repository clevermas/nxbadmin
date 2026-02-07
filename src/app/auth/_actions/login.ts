"use server";

import { FormAction } from "@/lib/action";
import { auth } from "@/lib/auth";
import { LoginSchema } from "@/schemas/auth.schema";

export const loginAction = FormAction(LoginSchema, async (_, data, res) => {
  try {
    await auth.api.signInEmail({ body: data });

    return res.success("Login successful");
  } catch (_) {
    return res.error("Invalid credentials");
  }
});
