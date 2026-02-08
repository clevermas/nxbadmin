"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, type SubmitHandler, useForm } from "react-hook-form";

import type { FlattenedError } from "@/config/types";

import { registerAction } from "@/app/auth/_actions/register";
import { hookFormErrorHandler } from "@/lib/form";
import { RegisterSchema } from "@/schemas/auth.schema";

import { PasswordStrength } from "./password-strength";
import { SubmitButton } from "@/components/shared/submit-button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { FormError, FormSuccess } from "@/components/ui/form-messages";
import { Input } from "@/components/ui/input";

export const RegisterForm = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    control,
  } = useForm({
    resolver: zodResolver(RegisterSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  const onSubmit: SubmitHandler<RegisterSchema> = async (data) => {
    const result = await registerAction(data);

    if (result.success) {
      setSuccessMessage(result.message || "");
      setTimeout(router.refresh, 3000);
    } else {
      hookFormErrorHandler(
        result.errors as FlattenedError<RegisterSchema>,
        setError,
      );
      setSuccessMessage("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col gap-5"
    >
      <Field data-invalid={!!errors.name}>
        <FieldLabel htmlFor="name">Name</FieldLabel>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              id="name"
              placeholder="Name"
              autoComplete="name"
              aria-invalid={!!errors.name}
            />
          )}
        />
        <FieldError>{errors.name?.message}</FieldError>
      </Field>

      <Field data-invalid={!!errors.email}>
        <FieldLabel htmlFor="email">Email</FieldLabel>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              id="email"
              placeholder="Email"
              autoComplete="email"
              aria-invalid={!!errors.email}
            />
          )}
        />
        <FieldError>{errors.email?.message}</FieldError>
      </Field>

      <Field data-invalid={!!errors.password}>
        <FieldLabel htmlFor="password">Password</FieldLabel>
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <PasswordStrength
              id="password"
              value={field.value}
              onChange={field.onChange}
              aria-invalid={!!errors.password}
            >
              <FieldError>{errors.password?.message}</FieldError>
            </PasswordStrength>
          )}
        />
      </Field>

      <FormSuccess message={successMessage} />
      <FormError message={errors.root?.message} />
      {!successMessage && (
        <SubmitButton disabled={isSubmitting}>Register</SubmitButton>
      )}
    </form>
  );
};
