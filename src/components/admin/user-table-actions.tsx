"use client";

import type { UserWithRole } from "better-auth/plugins";
import { PencilIcon, TrashIcon } from "lucide-react";
import Link from "next/link";
import { useContext, useState } from "react";

import { routes } from "@/config/routes";

import { removeUserAction } from "@/app/admin/_actions/remove-user";
import { actionToast } from "@/lib/form";
import { cn } from "@/lib/utils";

import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { DataTableContext } from "@/components/shared/data-table-provider";
import { Button } from "@/components/ui/button";

interface UserTableActionsProps {
  user: UserWithRole;
}

export const UserTableActions = ({ user }: UserTableActionsProps) => {
  const [open, setOpen] = useState(false);

  const {
    filter: { transition, startTransition },
  } = useContext(DataTableContext);

  const handleRemove = () =>
    startTransition(() => {
      actionToast(removeUserAction({ userId: user.id }), {
        loading: "Removing user...",
      });
    });

  return (
    <div className="flex items-center gap-1">
      <Button
        variant="ghost"
        size="icon-sm"
        className={cn("rounded-full text-muted-foreground")}
        asChild
      >
        <Link
          href={routes.adminUserManage(user.id)}
          className={
            transition ? "pointer-events-none text-muted-foreground/50" : ""
          }
        >
          <PencilIcon size={16} />
        </Link>
      </Button>

      <ConfirmDialog
        open={open}
        onOpenChange={setOpen}
        trigger={
          <Button
            variant="ghost"
            size="icon-sm"
            className="rounded-full text-muted-foreground hover:text-destructive hover:bg-destructive/10"
            disabled={transition}
          >
            <TrashIcon size={16} />
          </Button>
        }
        title="Are you sure?"
        description="This action cannot be undone. This will permanently delete the user account."
        onConfirm={handleRemove}
        variant="destructive"
      />
    </div>
  );
};
