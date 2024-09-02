import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function styleHelper(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
