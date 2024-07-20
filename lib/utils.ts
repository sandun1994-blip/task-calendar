import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const checkRoles = (roles: string[], selectRoles: string[]) => {
  for (let value of roles) {
    if (selectRoles.includes(value)) {
      return true;
    }
  }

  return false;
};
