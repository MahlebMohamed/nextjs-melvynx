import { createSafeActionClient } from "next-safe-action";

export class safeError extends Error {
  constructor(error: string) {
    super(error);
  }
}

export const actionClient = createSafeActionClient({
  handleServerError: (error: Error) => {
    if (error instanceof safeError) {
      return error.message;
    }

    return "Something went wrong";
  },
});
