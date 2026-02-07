import type z from "zod";

export type ActionState<T = unknown> = {
  success: boolean;
  data?: {} & Record<keyof T, unknown>;
  message?: string;
  errors?: FlattenedError<T>;
};

export type ActionStateFormRecord = {
  value: unknown;
  error: string;
  errorAttr: "true" | undefined;
};

export type ActionResponse = {
  success: (
    message: string,
    data?: z.infer<z.ZodObject<z.ZodRawShape>>,
  ) => void;
  error: (message: string | string[] | FlattenedError) => void;
};

export type FlattenedError<E = unknown, U = string> =
  | {
      formErrors: U[];
      fieldErrors?: Record<keyof E, U[]>;
    }
  | {
      formErrors?: U[];
      fieldErrors: Record<keyof E, U[]>;
    }
  | {
      formErrors?: U[];
      fieldErrors?: Record<keyof E, U[]>;
    };
