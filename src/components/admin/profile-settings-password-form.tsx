"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { Controller, type SubmitHandler, useForm } from "react-hook-form";

import type { FlattenedError } from "@/config/types";

import { updateProfileSettingsPasswordAction } from "@/app/admin/_actions/update-profile-settings-password";
import {
  actionToast,
  hookFormErrorHandler,
  submitButtonProps,
} from "@/lib/form";
import { ProfilePasswordSchema } from "@/schemas/profile.schema";

import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { PasswordInput } from "@/components/shared/password-input";
import { SubmitButton } from "@/components/shared/submit-button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { useConfirmSubmit } from "@/hooks/use-confirm-submit";

export const ProfileSettingsPasswordForm = () => {
  const [transition, startTransition] = useTransition();

  const form = useForm<ProfilePasswordSchema>({
    resolver: zodResolver(ProfilePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const { handleSubmit, formState, setError, reset, control } = form;
  const submit = submitButtonProps(formState, transition);

  const onSubmit: SubmitHandler<ProfilePasswordSchema> = (data) => {
    startTransition(async () => {
      const result = await actionToast(
        updateProfileSettingsPasswordAction(data),
        {
          loading: "Changing password...",
        },
      );
      if (!result.success) {
        hookFormErrorHandler(
          result.errors as FlattenedError<ProfilePasswordSchema>,
          setError,
        );
      } else {
        reset();
      }
    });
  };

  const { onBeforeConfirm, onConfirm, ...confirmProps } = useConfirmSubmit({
    onSubmit,
    handleSubmit,
  });

  return (
    <form
      onSubmit={handleSubmit(onBeforeConfirm)}
      className="grid gap-5 sm:grid-cols-2"
    >
      <div className="grid grid-cols-subgrid col-span-2">
        <div className="col-start-1">
          <Field className="">
            <FieldLabel>Current Password</FieldLabel>
            <Controller
              name="currentPassword"
              control={control}
              render={({ field }) => (
                <PasswordInput {...field} placeholder="Current Password" />
              )}
            />
            {formState.errors.currentPassword && (
              <FieldError>
                {formState.errors.currentPassword.message}
              </FieldError>
            )}
          </Field>
        </div>
      </div>

      <Field>
        <FieldLabel>New Password</FieldLabel>
        <Controller
          name="newPassword"
          control={control}
          render={({ field }) => (
            <PasswordInput {...field} placeholder="New Password" />
          )}
        />
        {formState.errors.newPassword && (
          <FieldError>{formState.errors.newPassword.message}</FieldError>
        )}
      </Field>

      <Field>
        <FieldLabel>Confirm New Password</FieldLabel>
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => (
            <PasswordInput {...field} placeholder="Confirm New Password" />
          )}
        />
        {formState.errors.confirmPassword && (
          <FieldError>{formState.errors.confirmPassword.message}</FieldError>
        )}
      </Field>

      <div className="pt-2">
        <SubmitButton {...submit}>Change</SubmitButton>
        <ConfirmDialog
          title="Are you sure?"
          description="This action will change your password. You will need to use the new password to log in next time."
          onConfirm={onConfirm}
          {...confirmProps}
        />
      </div>
    </form>
  );
};
