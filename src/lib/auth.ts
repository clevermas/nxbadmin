import "dotenv/config";

import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { admin } from "better-auth/plugins";
import { headers } from "next/headers";

import { routes } from "@/config/routes";

import { sendEmail } from "@/lib/email";
import { prisma } from "@/lib/prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: false,
    sendVerificationEmail: async ({ user, url }) => {
      const verifyUrl = new URL(url);
      if (!verifyUrl.searchParams.has("callbackURL")) {
        verifyUrl.searchParams.set("callbackURL", routes.login);
      }

      await sendEmail({
        to: user.email,
        subject: "Verify your email address",
        text: `Click the link to verify your email: ${verifyUrl.toString()}`,
      });
    },
  },
  plugins: [admin(), nextCookies()],
});

export const getSession = async () => {
  return await auth.api.getSession({
    headers: await headers(),
  });
};
