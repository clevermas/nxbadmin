import { APIError } from "better-auth";

import type { ActionResponse } from "@/lib/action";

export const userNotFound = (e: unknown, res: ActionResponse) => {
  if (e instanceof APIError) {
    if (e.status === "NOT_FOUND") {
      res.error("User not found");
      return true;
    }
  }
};
