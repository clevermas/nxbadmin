import { ActionResponse, ActionState } from "@/config/types";
import z from "zod";

export function Action<InputData extends z.ZodObject<z.ZodRawShape>>(
  validator: InputData,
  action: (
    input: z.infer<InputData>,
    response: ActionResponse,
  ) => Promise<void>,
) {
  let state: ActionState = { success: true, message: "", data: {} };

  const validate = () => {
    const { data, success, error } = validator.safeParse(state.data);

    if (!success) {
      response.error(z.flattenError(error));
      return;
    }

    response.success("", data);
  };

  const response: ActionResponse = {
    success: (message?, data?) => {
      state = {
        data,
        success: true,
        message,
      };
    },
    error: (error) => {
      state = {
        success: false,
        errors:
          typeof error === "string"
            ? { formErrors: [error] }
            : Array.isArray(error)
              ? { formErrors: error }
              : error.fieldErrors && error,
      };
    },
  };

  return async (input: z.infer<InputData>) => {
    state.data = input;
    validate();

    if (!state.success) {
      return state;
    }

    try {
      await action(state.data as z.infer<InputData>, response);

      return state;
    } catch (e: unknown) {
      console.error(e);

      response.error("Internal server error");

      return state;
    }
  };
}

export function FormAction<InputData extends z.ZodObject<z.ZodRawShape>>(
  validator: InputData,
  action: (
    prevState: ActionState,
    input: z.infer<InputData>,
    response: ActionResponse,
  ) => Promise<void>,
) {
  let state: ActionState = {
    success: true,
    message: "",
    data: {},
  };

  const validate = () => {
    const { data, success, error } = validator.safeParse(state.data);

    if (!success) {
      response.error(z.flattenError(error));
      return;
    }

    response.success("", data);
  };

  const response: ActionResponse = {
    success: (message?, data?) => {
      state = {
        data: data || state.data,
        success: true,
        message,
      };
    },
    error: (error) => {
      state = {
        data: state.data,
        success: false,
        errors:
          typeof error === "string"
            ? { formErrors: [error] }
            : Array.isArray(error)
              ? { formErrors: error }
              : error.fieldErrors && error,
      };
    },
  };

  return async (prevState: ActionState, input: FormData) => {
    state.data = Object.fromEntries(
      Object.keys(validator.shape).map((i) => [i, input.get(i)]),
    );
    validate();

    if (!state.success) {
      return state;
    }

    try {
      await action(prevState, state.data as z.infer<InputData>, response);

      return state;
    } catch (e: unknown) {
      console.error(e);

      response.error("Internal server error");

      return state;
    }
  };
}
