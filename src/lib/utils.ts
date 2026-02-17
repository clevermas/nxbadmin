import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toConstTuple<T extends Record<string, unknown>>(
  myEnum: T,
): ReadonlyArray<T[keyof T]> {
  return Object.values(myEnum) as ReadonlyArray<T[keyof T]>;
}
