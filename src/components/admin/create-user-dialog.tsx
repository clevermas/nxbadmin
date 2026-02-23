"use client";

import { useContext, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DataTableContext } from "@/components/shared/data-table-provider";
import { CreateUserForm } from "./create-user-form";

interface CreateUserDialogProps {
  children: React.ReactNode;
}

export const CreateUserDialog = ({ children }: CreateUserDialogProps) => {
  const { filter: transitionProps } = useContext(DataTableContext);

  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create User</DialogTitle>
        </DialogHeader>
        <CreateUserForm onSuccess={() => setOpen(false)} {...transitionProps} />
      </DialogContent>
    </Dialog>
  );
};
