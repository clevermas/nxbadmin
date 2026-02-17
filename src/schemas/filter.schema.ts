import { parseAsString } from "nuqs/server";
import { z } from "zod";

import { createFilterParser, defaultFilterLimit } from "@/lib/filter";

export const pageCodec = z.codec(
  z.string(),
  z
    .number()
    .refine((val) => +val > 0, {
      message: "Page must be greater than 0",
    })
    .nullish(),
  {
    decode: (encoded) => Number(encoded),
    encode: (decoded) => String(decoded),
  },
);
export const pageParser = createFilterParser(pageCodec);

export const limitCodec = z.codec(
  z.string(),
  z.union(defaultFilterLimit.map((l) => z.literal(l))).nullish(),
  {
    decode: (encoded) => +encoded as (typeof defaultFilterLimit)[number],
    encode: (decoded) => String(decoded),
  },
);
export const limitParser = createFilterParser(limitCodec);

export const searchCodec = z.codec(z.string(), z.string(), {
  decode: (encoded) => String(encoded),
  encode: (decoded) => String(decoded),
});
export const searchParser = parseAsString;
