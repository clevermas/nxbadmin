import type {
  FieldValues,
  FormState,
  Path,
  UseFormSetError,
} from "react-hook-form";
import { toast } from "sonner";

import { routes } from "@/config/routes";
import type { FlattenedError } from "@/config/types";

import type { ActionState, ActionStateFormRecord } from "@/lib/action";

export const submitButtonProps = (
  state: FormState<FieldValues>,
  loading: boolean,
) => {
  const { isDirty, isSubmitted, isValid } = state;
  return {
    disabled: !isDirty || (isSubmitted && !isValid) || loading,
    loading,
  };
};

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

interface ActionToastConfig {
  loading: string;
  error?: string;
}
export const actionToast = (
  promise: Promise<ActionState>,
  { loading, error = "Invalid fields" }: ActionToastConfig,
) => {
  toast.promise(promise, {
    loading,
    success: (result) => {
      if (result.success) {
        return result.message;
      }
      throw new Error(result.errors?.formErrors?.[0] ?? error);
    },
    error: (error) => {
      return error.message === "NEXT_REDIRECT"
        ? error?.digest?.includes(routes.login)
          ? "Unauthorized"
          : "Request aborted due to redirection"
        : error.message;
    },
  });

  return promise;
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
