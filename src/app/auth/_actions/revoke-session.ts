"use server";

import { cookies } from "next/headers";

export const revokeSession = async () => {
  const cookieStore = await cookies();

  cookieStore.set("better-auth.session_token", "", {
    httpOnly: true,
    path: "/",
    expires: new Date(0),
  });
};
