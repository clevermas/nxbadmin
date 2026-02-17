import type z from "zod";

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
}

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

export interface PageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
  params?: Promise<{ slug: string }>;
}
