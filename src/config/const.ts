import { toConstTuple } from "@/lib/utils";

export enum UserRole {
  Admin = "admin",
  User = "user",
}
export const userRoles = toConstTuple(UserRole);
