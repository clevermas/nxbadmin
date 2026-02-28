import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

import { AdminContainer } from "@/components/admin/admin-container";
import { UpdateUserDetailsForm } from "@/components/admin/update-user-details-form";
import { UpdateUserPasswordForm } from "@/components/admin/update-user-password-form";
import { NoData } from "@/components/shared/no-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
    <section>
      <AdminContainer className="space-y-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Manage user</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-8">
            <UpdateUserDetailsForm user={user} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Change password</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-8">
            <UpdateUserPasswordForm user={user} />
          </CardContent>
        </Card>
      </AdminContainer>
    </section>
  );
}
