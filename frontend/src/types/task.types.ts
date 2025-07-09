import { taskBaseSchema } from "@/schemas/task.schema";
import z from "zod/v4";

export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
}

export type NewTaskInput = {
  title: string;
  description: string;
  completed?: boolean;
};

const updateTaskBodySchema = taskBaseSchema.partial();

export type UpdateTaskInput = z.infer<typeof updateTaskBodySchema>;

export interface TaskItemProps {
  task: Task;
  onToggle?: (id: number) => void;
  onDelete?: (id: number) => void;
}

export interface TaskFormProps {
  onSubmit: (data: NewTaskInput) => void;
  initialValues?: NewTaskInput;
  loading?: boolean;
}
