import * as z from "zod/v4";

export const taskBodySchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  completed: z.boolean().default(false),
});

export const taskParamsSchema = z.object({
  id: z.string().regex(/^[1-9]\d*$/, "ID must be a positive integer"),
});

export const createTaskSchema = z.object({
  body: taskBodySchema,
});

export const updateTaskSchema = z.object({
  body: taskBodySchema.partial(),
  params: taskParamsSchema,
});

export const idTaskSchema = z.object({
  params: taskParamsSchema,
});
