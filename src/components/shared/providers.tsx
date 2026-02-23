"use client";

import { NuqsAdapter } from "nuqs/adapters/next/app";

import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";

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
