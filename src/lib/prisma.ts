import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaPg } from "@prisma/adapter-pg";

import { PrismaClient } from "@/generated/prisma/client";

import { env } from "@/env";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

function makeClient() {
  const connectionString = env.DATABASE_URL;
  const adapter =
    env.NODE_ENV !== "production"
      ? new PrismaPg({ connectionString })
      : new PrismaNeon({ connectionString });

  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma || makeClient();

if (env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
