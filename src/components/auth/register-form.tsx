"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Controller, type SubmitHandler, useForm } from "react-hook-form";

import type { FlattenedError } from "@/config/types";

import { registerAction } from "@/app/auth/_actions/register";
import {
  actionToast,
  hookFormErrorHandler,
  submitButtonProps,
} from "@/lib/form";
import { RegisterSchema } from "@/schemas/auth.schema";

import { PasswordInputStrength } from "./password-input-strength";
import { PasswordInput } from "@/components/shared/password-input";
import { SubmitButton } from "@/components/shared/submit-button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export const RegisterForm = () => {
  const [transition, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(RegisterSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  const { handleSubmit, control, formState, setError } = form;
  const errors = formState.errors;
  const submit = submitButtonProps(formState, transition);

  const onSubmit: SubmitHandler<RegisterSchema> = async (data) =>
    startTransition(async () => {
      const result = await actionToast(registerAction(data), {
        loading: "Registering...",
      });

      if (!result.success) {
        hookFormErrorHandler(
          result.errors as FlattenedError<RegisterSchema>,
          setError,
        );
      } else {
        router.refresh();
      }
    });

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
            <>
              <PasswordInput
                id="password"
                value={field.value}
                onChange={field.onChange}
                aria-invalid={!!errors.password}
                placeholder="Password"
              />
              <FieldError>{errors.password?.message}</FieldError>
              <PasswordInputStrength value={field.value} />
            </>
          )}
        />
      </Field>

      <SubmitButton {...submit}>Register</SubmitButton>
    </form>
  );
};
