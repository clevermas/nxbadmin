import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { routes } from "@/config/routes";

import { auth } from "@/lib/auth";

import { AdminHeader } from "@/components/admin/admin-header";
import { AdminProviders } from "@/components/admin/admin-providers";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { SidebarInset } from "@/components/ui/sidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect(routes.login);
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
