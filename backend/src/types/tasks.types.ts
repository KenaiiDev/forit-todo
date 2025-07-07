import { Task as PrismaTask } from "@/../generated/prisma";

export type Task = PrismaTask;
export type TaskId = Task["id"];

export type CreateTaskDto = Omit<Task, "id" | "createdAt">;
export type UpdateTaskDto = Partial<Omit<Task, "id" | "createdAt">>;
export type ToggleTaskDto = Task["completed"];
