"user server";

import { signOut } from "@/auth";

export const logOut = async () => {
  try {
    await signOut();
  } catch (error) {
    return {
      error: "Logout failed",
    };
  }
};
