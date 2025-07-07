import type { Response, Request } from "express";
import { httpResponse } from "@/libs/httpResponse";

const ERROR_HANDLER = {
  defaultError: (res: Response, err: unknown) => {
    const message = "Internal server error";
    return httpResponse.INTERNAL_SERVER_ERROR(res, message, err);
  },
};

export const errorHandler = (err: unknown, _req: Request, res: Response) => {
  let option: string | undefined;
  if (err instanceof Error) {
    option = err.name;
  }

  const handler =
    ERROR_HANDLER[option as keyof typeof ERROR_HANDLER] ??
    ERROR_HANDLER.defaultError;

  handler(res, err);
};
