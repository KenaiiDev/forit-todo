import { parseApiResponse } from "@/lib/api";
import { NewTaskInput, Task, UpdateTaskInput } from "@/types/task.types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3030/api";

export async function getTasks(
  search?: string,
  status: "all" | "pending" | "completed" = "all"
): Promise<Task[]> {
  const url = new URL(`${API_URL}/tasks`);
  if (search) url.searchParams.set("search", search);
  if (status) url.searchParams.set("status", status);

  const res = await fetch(url.toString());
  return parseApiResponse<Task[]>(res);
}

export async function getCompletedTasks(): Promise<Task[]> {
  const res = await fetch(`${API_URL}/tasks/completed`);
  return parseApiResponse<Task[]>(res);
}

export async function getPendingTasks(): Promise<Task[]> {
  const res = await fetch(`${API_URL}/tasks/pending`);
  return parseApiResponse<Task[]>(res);
}

export async function getTaskById(id: number): Promise<Task> {
  const res = await fetch(`${API_URL}/tasks/${id}`);
  return parseApiResponse<Task>(res);
}

export async function createTask(data: NewTaskInput): Promise<Task> {
  const res = await fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return parseApiResponse<Task>(res);
}

export async function updateTask(
  id: number,
  data: UpdateTaskInput
): Promise<Task> {
  const res = await fetch(`${API_URL}/tasks/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return parseApiResponse<Task>(res);
}

export async function deleteTask(id: number): Promise<void> {
  const res = await fetch(`${API_URL}/tasks/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("Error al eliminar tarea");
  }

  return;
}

export async function toggleTaskStatus(id: number): Promise<Task> {
  const res = await fetch(`${API_URL}/tasks/toggle/${id}`, {
    method: "PATCH",
  });
  return parseApiResponse<Task>(res);
}
