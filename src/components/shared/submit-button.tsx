"use client";

import { Loader2 } from "lucide-react";
import { type ComponentProps } from "react";
import { useFormStatus } from "react-dom";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface SubmitButtonProps extends ComponentProps<typeof Button> {
  loading?: boolean;
}

export const SubmitButton = ({
  children,
  disabled: _disabled,
  loading: _loading,
  className,
  ...props
}: SubmitButtonProps) => {
  const { pending } = useFormStatus();
  const disabled = _disabled || pending;
  const loading = _loading || pending;

  return (
    <Button
      disabled={disabled}
      type="submit"
      className={cn("w-full", className)}
      {...props}
    >
      {loading && (
        <Loader2 className="h-4 w-4 shrink-0 animate-spin" aria-hidden="true" />
      )}{" "}
      {children || "Submit"}
    </Button>
  );
};
