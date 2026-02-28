"use client";

import { CircleCheck } from "lucide-react";
import { Controller, useFormContext } from "react-hook-form";

import { userRoles } from "@/config/const";

import { toTitleCase } from "@/lib/utils";
import type { UserDetailsSchema } from "@/schemas/user-admin.schema";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export const EditUserDetailsFields = () => {
  const context = useFormContext<UserDetailsSchema>();
  if (!context) return;

  const {
    control,
    formState: { errors },
  } = context;

  return (
    <>
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

      <Field data-invalid={!!errors.role}>
        <FieldLabel htmlFor="role-user">Role</FieldLabel>
        <Controller
          name="role"
          control={control}
          render={({ field }) => (
            <ToggleGroup
              type="single"
              value={field.value}
              onValueChange={(val: string) => val && field.onChange(val)}
              className="justify-start"
              variant="outline"
            >
              {userRoles.map((r) => (
                <ToggleGroupItem
                  id={`role-${r}`}
                  key={r}
                  value={r}
                  aria-label={`Select ${r} role`}
                  className="flex-1"
                >
                  {toTitleCase(r)}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          )}
        />
        <FieldError>{errors.role?.message}</FieldError>
      </Field>

      <Field>
        <FieldLabel htmlFor="emailVerified">Status</FieldLabel>
        <Controller
          name="emailVerified"
          control={control}
          render={({ field }) => (
            <Toggle
              id="emailVerified"
              pressed={field.value}
              onPressedChange={field.onChange}
              aria-label="Toggle email verification"
              className="w-full justify-between px-3"
              variant="outline"
            >
              Verified
              {field.value && <CircleCheck size={16} />}
            </Toggle>
          )}
        />
      </Field>
    </>
  );
};
