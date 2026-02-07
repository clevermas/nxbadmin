import type { FieldValues, Path, UseFormSetError } from "react-hook-form";

import type {
  ActionState,
  ActionStateFormRecord,
  FlattenedError,
} from "@/config/types";

export const hookFormErrorHandler = <T extends FieldValues>(
  errors: FlattenedError<T>,
  setError: UseFormSetError<T>,
) => {
  Object.keys(errors.fieldErrors || {}).forEach((field) => {
    setError(field as Path<T>, { message: errors.fieldErrors?.[field][0] });
  });
  if (errors.formErrors?.length) {
    setError("root", { message: errors.formErrors[0] });
  }
};

export const actionStateFormHandler = <T>(state: ActionState<T>) => {
  const fieldErrors = (state.errors?.fieldErrors || {}) as Record<
    keyof T,
    string
  >;
  const data = Object.fromEntries(
    state.data
      ? Object.keys(state.data).map((i) => [
          i,
          {
            value: state.data?.[i as keyof unknown],
            error: fieldErrors[i as keyof T]?.[0],
            errorAttr: fieldErrors[i as keyof T] ? "true" : undefined,
          },
        ])
      : [],
  ) as Record<keyof T, ActionStateFormRecord>;

  return {
    ...data,
    error: () => state.errors?.formErrors?.[0],
  };
};

export const initialActionState = <T>(data?: Record<keyof T, unknown>) => ({
  data: data || ({} as never),
  success: false,
  message: "",
  errors: {},
});
