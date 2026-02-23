"use client";

import { NuqsAdapter } from "nuqs/adapters/next/app";

import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <NuqsAdapter>
      <TooltipProvider>
        {children}
        <Toaster />
      </TooltipProvider>
    </NuqsAdapter>
  );
};
