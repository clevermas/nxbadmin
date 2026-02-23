import { z } from "zod";

import {
  createFilterParser,
  type DefaultFilterOrder,
  defaultFilterOrder,
} from "@/lib/filter";
import { toConstTuple } from "@/lib/utils";

export enum UserTableColumns {
  Name = "name",
  Email = "email",
  EmailVerified = "emailVerified",
  Role = "role",
  CreatedAt = "createdAt",
}
export const userTableSortColumns = toConstTuple(UserTableColumns);

export const sortCodec = z.codec(
  z.string(),
  z.object({
    id: z.enum(userTableSortColumns).nullable().optional(),
    order: z.enum(defaultFilterOrder).nullable().optional(),
  }),
  {
    decode: (encoded: string) => {
      const [id, order] = encoded.split(":");
      return {
        id: id as UserTableColumns,
        order: order as DefaultFilterOrder,
      };
    },
    encode: (decoded) => (decoded ? `${decoded.id}:${decoded.order}` : ""),
  },
);

export const sortParser = createFilterParser(sortCodec);
