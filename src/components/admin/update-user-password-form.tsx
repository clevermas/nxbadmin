"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { type FlattenedError } from "@/config/types";

import { updateUserPasswordAction } from "@/app/admin/_actions/update-user-password";
import {
  actionToast,
  hookFormErrorHandler,
  submitButtonProps,
} from "@/lib/form";
import {
  UpdateUserPasswordSchema,
  UserPasswordSchema,
} from "@/schemas/user-admin.schema";

import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { SubmitButton } from "@/components/shared/submit-button";
import { useConfirmSubmit } from "@/hooks/use-confirm-submit";
import { EditUserPasswordFields } from "./user-password-fields";

interface UpdateUserPasswordFormProps {
  user: {
    id: string;
  };
}

export const UpdateUserPasswordForm = ({
  user,
}: UpdateUserPasswordFormProps) => {
  const [transition, startTransition] = useTransition();

  const form = useForm<UserPasswordSchema>({
    resolver: zodResolver(UserPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const { handleSubmit, formState, setError, reset } = form;
  const submit = submitButtonProps(formState, transition);

  const onSubmit = (data: UserPasswordSchema) => {
    startTransition(async () => {
      const result = await actionToast(
        updateUserPasswordAction({ userId: user.id, ...data }),
        {
          loading: "Updating password...",
        },
      );

      if (!result.success) {
        hookFormErrorHandler(
          result.errors as FlattenedError<UpdateUserPasswordSchema>,
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
    <FormProvider {...form}>
      <form
        onSubmit={handleSubmit(onBeforeConfirm)}
        className="flex w-full flex-col gap-5"
      >
        <input type="hidden" name="userId" value={user.id} />
        <EditUserPasswordFields />

        <div className="space-y-4 pt-4 mt-auto">
          <SubmitButton {...submit}>Change</SubmitButton>
          <ConfirmDialog
            title="Are you sure?"
            description="This action will change the user's password. They will need to use the new password to log in."
            onConfirm={onConfirm}
            {...confirmProps}
          />
        </div>
      </form>
    </FormProvider>
  );
};
