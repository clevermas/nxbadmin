"use client";

import { usePathname } from "next/navigation";
import type * as React from "react";

import { routes } from "@/config/routes";

import { AdminSidebarNav } from "./admin-sidebar-nav";
import { AdminSidebarUserMenu } from "./admin-sidebar-user-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";

const nav = [
  {
    title: "Admin",
    url: "/admin",
    items: [
      {
        title: "Users",
        url: routes.admin,
      },
      {
        title: "Profile Settings",
        url: routes.adminProfileSettings,
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

export const AdminSidebar = ({
  user,
  ...props
}: AdminSidebarProps & React.ComponentProps<typeof Sidebar>) => {
  const path = usePathname();

  const { name, email } = user;

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <AdminSidebarUserMenu user={{ name, email }} />
      </SidebarHeader>
      <SidebarContent>
        <AdminSidebarNav items={nav} path={path} />
      </SidebarContent>
      <SidebarFooter></SidebarFooter>
    </Sidebar>
  );
};
