import type * as React from "react";

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

interface AdminSidebarProps {
  user: {
    name: string;
    email: string;
  };
}

export const AdminSidebar = async ({
  user,
  ...props
}: AdminSidebarProps & React.ComponentProps<typeof Sidebar>) => {
  const { name, email } = user;

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
