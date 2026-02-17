"use client";

import { NuqsAdapter } from "nuqs/adapters/next/app";

import { TooltipProvider } from "@/components/ui/tooltip";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <NuqsAdapter>
      <TooltipProvider>{children}</TooltipProvider>
    </NuqsAdapter>
  );
};
