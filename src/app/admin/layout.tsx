import { redirect } from "next/navigation";

import { routes } from "@/config/routes";

import { getSession } from "@/lib/auth";

import { AdminHeader } from "@/components/admin/admin-header";
import { AdminProviders } from "@/components/admin/admin-providers";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { SidebarInset } from "@/components/ui/sidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    redirect(`${routes.login}?revoke_session`);
  }

  return (
    <AdminProviders>
      <AdminSidebar user={session.user} />
      <SidebarInset>
        <AdminHeader />
        {children}
      </SidebarInset>
    </AdminProviders>
  );
}
