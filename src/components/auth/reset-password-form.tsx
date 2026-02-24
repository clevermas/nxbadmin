"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

import { routes } from "@/config/routes";

import { resetPasswordAction } from "@/app/auth/_actions/reset-password";
import type { ActionState } from "@/lib/action";
import { actionStateFormHandler, initialActionState } from "@/lib/form";
import type { ResetPasswordSchema } from "@/schemas/auth.schema";

import { PasswordInput } from "@/components/shared/password-input";
import { SubmitButton } from "@/components/shared/submit-button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";

interface ResetPasswordFormProps {
  token: string;
}
export const ResetPasswordForm = ({ token }: ResetPasswordFormProps) => {
  const router = useRouter();

  const [state, formAction] = useActionState(
    resetPasswordAction,
    initialActionState(),
  );

  const { password, confirmPassword, error } = actionStateFormHandler(
    state as ActionState<ResetPasswordSchema>,
  );

  useEffect(() => {
    if (!token) toast.error("Missing token");
  }, [token]);

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
      router.push(routes.login);
    }
    if (error()) {
      toast.error(error());
    }
  }, [state, router, error]);

  if (!token) {
    return;
  }

  return (
    <form action={formAction}>
      <input type="hidden" name="token" value={token} />
      <div className="space-y-4">
        <Field data-invalid={password?.errorAttr}>
          <FieldLabel htmlFor="password">New Password</FieldLabel>
          <PasswordInput
            id="password"
            name="password"
            defaultValue={password?.value as string}
            autoComplete="new-password"
            placeholder="New Password"
            aria-invalid={password?.errorAttr}
          />
          <FieldError>{password?.error}</FieldError>
        </Field>

        <Field data-invalid={confirmPassword?.errorAttr}>
          <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
          <PasswordInput
            id="confirmPassword"
            name="confirmPassword"
            defaultValue={confirmPassword?.value as string}
            autoComplete="new-password"
            placeholder="Confirm Password"
            aria-invalid={confirmPassword?.errorAttr}
          />
          <FieldError>{confirmPassword?.error}</FieldError>
        </Field>

        <div className="space-y-4">
          <SubmitButton>Reset Password</SubmitButton>
        </div>
      </div>
    </form>
  );
};
