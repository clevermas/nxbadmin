import Link from "next/link";
import * as React from "react";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

type AdminSidebarNavProps = {
  items: NavGroupItem[];
};

type NavGroupItem = {
  title: string;
  url: string;
  icon?: React.ReactNode;
  items?: NavItem[];
};

type NavItem = {
  title: string;
  url: string;
  isActive?: boolean;
};

export const AdminSidebarNav = ({ items }: AdminSidebarNavProps) => {
  return items.map((item) => (
    <SidebarGroup key={item.title}>
      <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {item.items?.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild isActive={item.isActive}>
                <Link href={item.url}>{item.title}</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  ));
};
