"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { Controller, type SubmitHandler, useForm } from "react-hook-form";

import type { FlattenedError } from "@/config/types";

import { updateProfileSettingsDetailsAction } from "@/app/admin/_actions/update-profile-settings-details";
import {
  actionToast,
  hookFormErrorHandler,
  submitButtonProps,
} from "@/lib/form";
import { ProfileDetailsSchema } from "@/schemas/profile.schema";

import { SubmitButton } from "@/components/shared/submit-button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

interface ProfileSettingsDetailsFormProps {
  user: {
    name: string;
    email: string;
  };
}

export const ProfileSettingsDetailsForm = ({
  user,
}: ProfileSettingsDetailsFormProps) => {
  const [transition, startTransition] = useTransition();

  const form = useForm<ProfileDetailsSchema>({
    resolver: zodResolver(ProfileDetailsSchema),
    defaultValues: {
      name: user.name,
    },
  });

  const { handleSubmit, formState, setError, reset, control } = form;
  const submit = submitButtonProps(formState, transition);

  const onSubmit: SubmitHandler<ProfileDetailsSchema> = (data) => {
    startTransition(async () => {
      const result = await actionToast(
        updateProfileSettingsDetailsAction(data),
        {
          loading: "Updating profile...",
        },
      );
      if (!result.success) {
        hookFormErrorHandler(
          result.errors as FlattenedError<ProfileDetailsSchema>,
          setError,
        );
      } else {
        reset(data);
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid gap-5 sm:grid-cols-2"
    >
      <Field>
        <FieldLabel>Name</FieldLabel>
        <Controller
          name="name"
          control={control}
          render={({ field }) => <Input {...field} placeholder="Your Name" />}
        />
        {formState.errors.name && (
          <FieldError>{formState.errors.name.message}</FieldError>
        )}
      </Field>

      <Field>
        <div className="text-sm font-medium">Email</div>
        <div className="h-9 flex items-center text-muted-foreground">
          {user.email}
        </div>
      </Field>

      <div className="pt-2">
        <SubmitButton {...submit}>Save</SubmitButton>
      </div>
    </form>
  );
};
