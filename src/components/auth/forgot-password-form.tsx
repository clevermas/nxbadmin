"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";

import { forgotPasswordAction } from "@/app/auth/_actions/forgot-password";
import type { ActionState } from "@/lib/action";
import { actionStateFormHandler, initialActionState } from "@/lib/form";
import type { ForgotPasswordSchema } from "@/schemas/auth.schema";

import { SubmitButton } from "@/components/shared/submit-button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export const ForgotPasswordForm = () => {
  const [state, formAction] = useActionState(
    forgotPasswordAction,
    initialActionState(),
  );
  const { email, error } = actionStateFormHandler(
    state as ActionState<ForgotPasswordSchema>,
  );

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
    }
    if (error()) {
      toast.error(error());
    }
  }, [state, error]);

  return (
    <form action={formAction}>
      <div className="space-y-4">
        <Field data-invalid={email?.errorAttr}>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            name="email"
            defaultValue={email?.value as string}
            autoComplete="email"
            placeholder="Email"
            aria-invalid={email?.errorAttr}
          />
          <FieldError>{email?.error}</FieldError>
        </Field>

        <div className="space-y-4">
          <SubmitButton>Send Link</SubmitButton>
        </div>
      </div>
    </form>
  );
};
