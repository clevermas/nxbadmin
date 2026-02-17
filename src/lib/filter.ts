import {
  createLoader,
  createParser,
  ParserMap,
  SearchParams,
} from "nuqs/server";
import { z } from "zod";

import { toConstTuple } from "@/lib/utils";

export enum DefaultFilterOrder {
  Asc = "asc",
  Desc = "desc",
}
export const defaultFilterOrder = toConstTuple(DefaultFilterOrder);
export type defaultFilterOrder = typeof defaultFilterOrder;

export const defaultFilterLimit = [5, 10, 25, 50, 100] as const;
export type defaultFilterLimit = (typeof defaultFilterLimit)[number];
export const defaultFilterSearchParams = {
  q: "",
  page: 1,
  limit: defaultFilterLimit[1],
  sort: { id: undefined, order: undefined },
};

export type DefaultFilterSearchParams = {
  q: string;
  page: number;
  limit: number;
  sort: {
    id: string | null | undefined;
    order: DefaultFilterOrder | null | undefined;
  };
};

export function createFilterParser<
  Input extends z.ZodCoercedString<string>,
  Output extends z.ZodType,
>(codec: z.ZodCodec<Input, Output>) {
  return createParser<z.output<Output>>({
    parse(query) {
      return codec.parse(query);
    },
    serialize(value) {
      return codec.encode(value);
    },
  });
}

export async function filterLoader<
  T extends Record<keyof ParserMap, unknown> = DefaultFilterSearchParams,
>(
  searchParams: SearchParams,
  parsers: ParserMap,
  defaultValues: T,
): Promise<T & { errors: string[] }> {
  const loader = createLoader(parsers);
  const result = await loader(searchParams);

  const data = Object.fromEntries(
    Object.keys(result).map((i) => [i, result[i] ?? defaultValues?.[i]]),
  ) as T;
  const errors = Object.keys(result).filter(
    (i) => !result[i] && !!searchParams[i],
  );

  return {
    ...data,
    errors,
  };
}
