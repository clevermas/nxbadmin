import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { routes } from "@/config/routes";

import { auth } from "@/lib/auth";

import { AdminHeader } from "@/components/admin/admin-header";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect(routes.home);
  }

  return (
    <SidebarProvider>
      <AdminSidebar user={session.user} />
      <SidebarInset>
        <AdminHeader />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
