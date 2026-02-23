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

export const toTitleCase = (str: string) => {
  return str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase(),
  );
};
