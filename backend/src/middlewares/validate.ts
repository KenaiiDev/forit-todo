import type { Request, Response, NextFunction } from "express";
import type { ZodObject } from "zod/v4";

export const validate =
  (schema: ZodObject) => (req: Request, _res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      next(error);
    }
  };
