"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { TransitionStartFunction } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { UserRole } from "@/config/const";
import { FlattenedError } from "@/config/types";

import { createUserAction } from "@/app/admin/_actions/create-user";
import {
  actionToast,
  hookFormErrorHandler,
  submitButtonProps,
} from "@/lib/form";
import { CreateUserSchema } from "@/schemas/user-admin.schema";

import { SubmitButton } from "@/components/shared/submit-button";
import { EditUserDetailsFields } from "./user-details-fields";
import { EditUserPasswordFields } from "./user-password-fields";

interface CreateUserFormProps {
  transition: boolean;
  startTransition: TransitionStartFunction;
  onSuccess?: () => void;
}

export const CreateUserForm = ({
  transition,
  startTransition,
  onSuccess,
}: CreateUserFormProps) => {
  const form = useForm<CreateUserSchema>({
    resolver: zodResolver(CreateUserSchema),
    defaultValues: {
      name: "",
      email: "",
      role: UserRole.User,
      password: "",
      confirmPassword: "",
    },
  });

  const { handleSubmit, formState, setError, reset } = form;
  const submit = submitButtonProps(formState, transition);

  const onSubmit = (data: CreateUserSchema) => {
    startTransition(async () => {
      const result = await actionToast(createUserAction(data), {
        loading: "Creating user...",
      });

      if (!result.success) {
        hookFormErrorHandler(
          result.errors as FlattenedError<CreateUserSchema>,
          setError,
        );
      } else {
        reset();
        onSuccess?.();
      }
    });
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-5"
      >
        <EditUserDetailsFields />
        <EditUserPasswordFields />

        <div className="space-y-4 pt-4">
          <SubmitButton {...submit}>Create</SubmitButton>
        </div>
      </form>
    </FormProvider>
  );
};
