import { headers } from "next/headers";

import { auth } from "@/lib/auth";

import { AdminContainer } from "@/components/admin/admin-container";
import { ProfileSettingsDetailsForm } from "@/components/admin/profile-settings-details-form";
import { ProfileSettingsPasswordForm } from "@/components/admin/profile-settings-password-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function ProfileSettingsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return;
  }

  const { user } = session;

  return (
    <section>
      <AdminContainer className="space-y-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Personal information</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-8">
            <ProfileSettingsDetailsForm user={user} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Change password</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-8">
            <ProfileSettingsPasswordForm />
          </CardContent>
        </Card>
      </AdminContainer>
    </section>
  );
}
