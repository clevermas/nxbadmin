import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

import { UpdateUserDetailsForm } from "@/components/admin/update-user-details-form";
import { UpdateUserPasswordForm } from "@/components/admin/update-user-password-form";
import { NoData } from "@/components/shared/no-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface AdminUserProfilePageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminUserProfilePage({
  params,
}: AdminUserProfilePageProps) {
  const { id } = await params;
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const isAdmin = session?.user.role === "admin";

  if (!isAdmin) {
    return <NoData />;
  }

  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      emailVerified: true,
    },
  });

  if (!user) {
    return <NoData />;
  }

  return (
    <section className="flex flex-1 flex-col px-4 pb-4">
      <Card className="pt-3 pb-7">
        <CardHeader>
          <CardTitle>Manage user</CardTitle>
        </CardHeader>
        <CardContent className="py-0 flex flex-col gap-8 lg:grid lg:grid-cols-[1fr_1px_1fr]">
          <UpdateUserDetailsForm user={user} />

          <Separator
            orientation="vertical"
            className="hidden lg:block"
          ></Separator>
          <Separator className="block lg:hidden"></Separator>

          <UpdateUserPasswordForm user={user} />
        </CardContent>
      </Card>
    </section>
  );
}
