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
