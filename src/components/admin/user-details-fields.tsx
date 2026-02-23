"use client";

import { Controller, useFormContext } from "react-hook-form";

import { userRoles } from "@/config/const";

import { toTitleCase } from "@/lib/utils";
import type { UserDetailsSchema } from "@/schemas/user-admin.schema";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
        <FieldLabel>Role</FieldLabel>
        <Controller
          name="role"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger aria-invalid={!!errors.role} id="role">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                {userRoles.map((r) => (
                  <SelectItem key={r} value={r}>
                    {toTitleCase(r)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        <FieldError>{errors.role?.message}</FieldError>
      </Field>
    </>
  );
};
