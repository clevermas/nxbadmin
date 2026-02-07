"use client";

import { Loader2 } from "lucide-react";
import { ReactNode } from "react";
import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";

export const SubmitButton = ({
  children,
  disabled,
}: {
  children: ReactNode;
  disabled?: boolean;
}) => {
  const { pending } = useFormStatus();
  const isDisabled = disabled || pending;

  return (
    <Button disabled={isDisabled} type="submit" className="w-full">
      {isDisabled && (
        <Loader2 className="h-4 w-4 shrink-0 animate-spin" aria-hidden="true" />
      )}{" "}
      {children || "Submit"}
    </Button>
  );
};
