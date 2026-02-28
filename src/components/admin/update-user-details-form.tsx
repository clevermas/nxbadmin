"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { FormProvider, type SubmitHandler, useForm } from "react-hook-form";

import { UserRole } from "@/config/const";
import type { FlattenedError } from "@/config/types";

import { updateUserDetailsAction } from "@/app/admin/_actions/update-user-details";
import {
  actionToast,
  hookFormErrorHandler,
  submitButtonProps,
} from "@/lib/form";
import {
  type UpdateUserDetailsSchema,
  UserDetailsSchema,
} from "@/schemas/user-admin.schema";

import { EditUserDetailsFields } from "./user-details-fields";
import { SubmitButton } from "@/components/shared/submit-button";

interface UpdateUserDetailsFormProps {
  user: {
    id: string;
    name: string;
    email: string;
    role: string | null;
    emailVerified: boolean;
  };
}

export const UpdateUserDetailsForm = ({ user }: UpdateUserDetailsFormProps) => {
  const [transition, startTransition] = useTransition();

  const form = useForm<UserDetailsSchema>({
    resolver: zodResolver(UserDetailsSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      role: (user.role as UserRole) || UserRole.User,
      emailVerified: user.emailVerified,
    },
  });
  const { handleSubmit, formState, setError, reset } = form;
  const submit = submitButtonProps(formState, transition);

  const onSubmit: SubmitHandler<UserDetailsSchema> = (data) => {
    startTransition(async () => {
      const result = await actionToast(
        updateUserDetailsAction({ userId: user.id, ...data }),
        {
          loading: "Updating user...",
        },
      );
      if (!result.success) {
        hookFormErrorHandler(
          result.errors as FlattenedError<UpdateUserDetailsSchema>,
          setError,
        );
      } else {
        console.log(result);
        reset(data);
      }
    });
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid gap-5 sm:grid-cols-2"
      >
        <EditUserDetailsFields />

        <div className="pt-2">
          <SubmitButton {...submit}>Save</SubmitButton>
        </div>
      </form>
    </FormProvider>
  );
};
