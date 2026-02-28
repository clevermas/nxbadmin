"use client";

import { ContainerProvider } from "@/components/shared/container-provider";
import { SidebarProvider } from "@/components/ui/sidebar";

export const AdminProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ContainerProvider>
      <SidebarProvider>{children}</SidebarProvider>
    </ContainerProvider>
  );
};
