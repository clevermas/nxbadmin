"use client";

import { Controller, useFormContext } from "react-hook-form";

import { UserPasswordSchema } from "@/schemas/user-admin.schema";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { PasswordInput } from "@/components/shared/password-input";

export const EditUserPasswordFields = () => {
  const context = useFormContext<UserPasswordSchema>();
  if (!context) return null;

  const {
    control,
    formState: { errors },
  } = context;

  return (
    <>
      <Field data-invalid={!!errors.password}>
        <FieldLabel htmlFor="password">Password</FieldLabel>
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <>
              <PasswordInput
                id="password"
                value={field.value || ""}
                onChange={field.onChange}
                aria-invalid={!!errors.password}
                placeholder="Password"
              />
              <FieldError>{errors.password?.message}</FieldError>
            </>
          )}
        />
      </Field>

      <Field data-invalid={!!errors.confirmPassword}>
        <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => (
            <>
              <PasswordInput
                id="confirmPassword"
                value={field.value || ""}
                onChange={field.onChange}
                aria-invalid={!!errors.confirmPassword}
                placeholder="Confirm password"
              />
              <FieldError>{errors.confirmPassword?.message}</FieldError>
            </>
          )}
        />
      </Field>
    </>
  );
};
