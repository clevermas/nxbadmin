import { toConstTuple } from "@/lib/utils";

export enum UserRole {
  User = "user",
  Admin = "admin",
}
export const userRoles = toConstTuple(UserRole);
