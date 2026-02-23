"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

import { loginAction } from "@/app/auth/_actions/login";
import type { ActionState } from "@/lib/action";
import { actionStateFormHandler, initialActionState } from "@/lib/form";
import type { LoginSchema } from "@/schemas/auth.schema";

import { SubmitButton } from "@/components/shared/submit-button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export const LoginForm = () => {
  const [state, formAction] = useActionState(loginAction, initialActionState());
  const { email, password, error } = actionStateFormHandler(
    state as ActionState<LoginSchema>,
  );

  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      router.refresh();
    }
    if (error()) {
      toast.error(error());
    }
  }, [state, router, error]);

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
        <Field data-invalid={password?.errorAttr}>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input
            id="password"
            type="password"
            name="password"
            defaultValue={password?.value as string}
            autoComplete="password"
            placeholder="Password"
            aria-invalid={password?.errorAttr}
          />
          <FieldError>{password?.error}</FieldError>
        </Field>

        <div className="space-y-4">
          <SubmitButton disabled={state.success}>Login</SubmitButton>
        </div>
      </div>
    </form>
  );
};
