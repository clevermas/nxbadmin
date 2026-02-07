"use client";

import { registerAction } from "@/app/auth/_actions/register";
import { SubmitButton } from "@/components/shared/submit-button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { FormError, FormSuccess } from "@/components/ui/form-messages";
import { Input } from "@/components/ui/input";
import { FlattenedError } from "@/config/types";
import { hookFormErrorHandler } from "@/lib/form";
import { RegisterSchema } from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { PasswordStrength } from "./password-strength";

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
      <Field>
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
            />
          )}
        />
        <FieldError>{errors.name?.message}</FieldError>
      </Field>

      <Field>
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
            />
          )}
        />
        <FieldError>{errors.email?.message}</FieldError>
      </Field>

      <Field>
        <FieldLabel htmlFor="password">Password</FieldLabel>
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <PasswordStrength
              id="password"
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
        <FieldError>{errors.password?.message}</FieldError>
      </Field>

      <FormSuccess message={successMessage} />
      <FormError message={errors.root?.message} />
      {!successMessage && (
        <SubmitButton disabled={isSubmitting}>Register</SubmitButton>
      )}
    </form>
  );
};
