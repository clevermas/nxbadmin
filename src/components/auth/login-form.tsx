"use client";

import { loginAction } from "@/app/auth/_actions/login";
import { SubmitButton } from "@/components/shared/submit-button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { FormError } from "@/components/ui/form-messages";
import { Input } from "@/components/ui/input";
import { ActionState } from "@/config/types";
import { actionStateFormHandler, initialActionState } from "@/lib/form";
import { LoginSchema } from "@/schemas/auth.schema";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

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
  }, [state, router]);

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
          <FormError message={error()} />
        </div>
      </div>
    </form>
  );
};
