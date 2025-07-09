import { z } from "zod/v4";

export const taskBaseSchema = z.object({
  title: z.string().min(1, "El titulo es obligatorio"),
  description: z.string().min(1, "La descripción es obligatoria"),
  completed: z.boolean().optional().default(false),
});

export const createTaskSchema = z.object({
  body: taskBaseSchema,
});

export const updateTaskSchema = z.object({
  body: taskBaseSchema.partial(),
});

export const taskParamsSchema = z.object({
  id: z.string().regex(/^[1-9]\d*$/, "ID debe ser un número entero positivo"),
});

export const taskQuerySchema = z.object({
  search: z.string().optional(),
});
