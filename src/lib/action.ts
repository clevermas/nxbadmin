import { redirect } from "next/navigation";
import z from "zod";

import { UserRole } from "@/config/const";
import { routes } from "@/config/routes";
import type { FlattenedError } from "@/config/types";

import { getSession } from "./auth";

export interface ActionState<T = unknown> {
  success: boolean;
  data?: {} & Record<keyof T, unknown>;
  message?: string;
  errors?: FlattenedError<T>;
}

export interface ActionStateFormRecord {
  value: unknown;
  error: string;
  errorAttr: "true" | undefined;
}

export interface ActionResponse {
  success: (
    message: string,
    data?: z.infer<z.ZodObject<z.ZodRawShape>>,
  ) => void;
  error: (message: string | string[] | FlattenedError) => void;
  redirect: (url: string) => void;
}

export interface ActionOptions {
  isPublic?: boolean;
  onCheckAccess?: (res: ActionResponse) => Promise<boolean>;
}

const hasAccess = async (res: ActionResponse) => {
  const session = await getSession();
  if (!session) {
    res.redirect(routes.login);
    return false;
  }
  if (session.user.role !== UserRole.Admin) {
    res.error("Forbidden");
    return false;
  }
  return true;
};

export function createAction<InputData extends z.ZodObject<z.ZodRawShape>>(
  validator: InputData,
  action: (
    input: z.infer<InputData>,
    response: ActionResponse,
  ) => Promise<void>,
  options?: ActionOptions,
) {
  const core = createActionCore(validator);
  const { isPublic = false, onCheckAccess = hasAccess } = options ?? {};

  return async (input: z.infer<InputData>) => {
    if (!isPublic && !(await onCheckAccess(core.response))) {
      if (core.getRedirectUrl()) redirect(core.getRedirectUrl() ?? "");
      else return core.getState();
    }

    core.updateData(input);

    const onAction = async () =>
      await action(core.getState().data as z.infer<InputData>, core.response);

    const result = await core.defaultHandler(onAction);

    if (core.getRedirectUrl()) redirect(core.getRedirectUrl() ?? "");
    else return result ?? core.getState();
  };
}

export function createFormAction<InputData extends z.ZodObject<z.ZodRawShape>>(
  validator: InputData,
  action: (
    prevState: ActionState,
    input: z.infer<InputData>,
    response: ActionResponse,
  ) => Promise<void>,
  options?: ActionOptions,
) {
  const core = createActionCore(validator);
  const { isPublic = false, onCheckAccess = hasAccess } = options ?? {};

  return async (prevState: ActionState, input: FormData) => {
    if (!isPublic && !(await onCheckAccess(core.response))) {
      if (core.getRedirectUrl()) redirect(core.getRedirectUrl() ?? "");
      else return core.getState();
    }

    core.updateData(
      Object.fromEntries(
        Object.keys(validator.shape).map((i) => [i, input.get(i)]),
      ),
    );
    const onAction = async () =>
      await action(
        prevState,
        core.getState().data as z.infer<InputData>,
        core.response,
      );
    const result = await core.defaultHandler(onAction);

    if (core.getRedirectUrl()) redirect(core.getRedirectUrl() ?? "");
    else return result ?? core.getState();
  };
}

export const createActionCore = (validator: z.ZodObject) => {
  const action: { state: ActionState; redirectUrl: string | null } = {
    state: { success: true, message: "", data: {} },
    redirectUrl: null,
  };

  const success = (message?: string, data = action.state.data) => {
    action.state = {
      data,
      success: true,
      message,
    };
  };

  const error = (error: string | string[] | FlattenedError) => {
    action.state = {
      ...action.state,
      success: false,
      errors:
        typeof error === "string"
          ? { formErrors: [error] }
          : Array.isArray(error)
            ? { formErrors: error }
            : error.fieldErrors && error,
    };
  };

  const redirect = (url: string) => {
    action.redirectUrl = url;
  };

  const validate = () => {
    const {
      data,
      success: _success,
      error: _error,
    } = validator.safeParse(action.state.data);

    if (!_success) {
      error(z.flattenError(_error));
      return;
    }

    success("", data);
  };

  const defaultHandler = async (onAction: () => void) => {
    validate();

    if (!action.state.success) {
      return action.state;
    }

    try {
      await onAction?.();

      return action.state;
    } catch (e: unknown) {
      console.error(e);

      error("Internal server error");

      return action.state;
    }
  };

  return {
    getState() {
      return action.state;
    },
    updateData(data: unknown & {}) {
      action.state.data = data;
    },
    defaultHandler,
    response: { success, error, redirect },
    getRedirectUrl() {
      return action.redirectUrl;
    },
  };
};
