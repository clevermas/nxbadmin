"use client";

import Link from "next/link";
import type * as React from "react";

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
  path: string;
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
};

export const AdminSidebarNav = ({ items, path }: AdminSidebarNavProps) => {
  return items.map((item) => (
    <SidebarGroup key={item.title}>
      <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {item.items?.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild isActive={item.url === path}>
                <Link href={item.url}>{item.title}</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  ));
};
