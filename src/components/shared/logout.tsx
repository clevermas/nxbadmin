"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export const LogoutButton = () => {
  const router = useRouter();
  const [transition, startTransition] = useTransition();
  const { signOut } = authClient;

  const handleLogout = async () => {
    try {
      startTransition(async () => {
        await signOut();
        router.refresh();
      });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <Button onClick={handleLogout} disabled={transition}>
      <LogOut className="h-4 w-4" />
      <span>Logout</span>
    </Button>
  );
};
