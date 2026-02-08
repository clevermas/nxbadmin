import { headers } from "next/headers";
import * as React from "react";

import { auth } from "@/lib/auth";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { AdminSidebarNav } from "./admin-sidebar-nav";
import { AdminSidebarUserMenu } from "./admin-sidebar-user-menu";

const nav = [
  {
    title: "Admin",
    url: "/admin",
    items: [
      {
        title: "Users",
        url: "/admin",
        isActive: true,
      },
    ],
  },
];

export const AdminSidebar = async ({
  ...props
}: React.ComponentProps<typeof Sidebar>) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const { name, email } = session?.user as { name: string; email: string };

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <AdminSidebarUserMenu user={{ name, email }} />
      </SidebarHeader>
      <SidebarContent>
        <AdminSidebarNav items={nav} />
      </SidebarContent>
      <SidebarFooter></SidebarFooter>
    </Sidebar>
  );
};
