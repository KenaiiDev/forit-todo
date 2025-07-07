import type { Response, Request, NextFunction } from "express";
import { httpResponse } from "@/libs/httpResponse";
import { ZodError } from "zod/v4";

const ERROR_HANDLER = {
  zodError: (res: Response, err: ZodError) => {
    return httpResponse.BAD_REQUEST(
      res,
      "Validation Failed",
      err.flatten().fieldErrors
    );
  },
  defaultError: (res: Response, err: unknown) => {
    const message = "Internal server error";
    return httpResponse.INTERNAL_SERVER_ERROR(res, message, err);
  },
};

export const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
) => {
  let option: string | undefined;
  if (err instanceof ZodError) {
    option = "zodError";
  } else {
    if (err instanceof Error) {
      option = err.name;
    }
  }

  const handler =
    ERROR_HANDLER[option as keyof typeof ERROR_HANDLER] ??
    ERROR_HANDLER.defaultError;

  if (option === "zodError") {
    (handler as (res: Response, err: ZodError) => void)(res, err as ZodError);
  } else {
    (handler as (res: Response, err: unknown) => void)(res, err);
  }
};
