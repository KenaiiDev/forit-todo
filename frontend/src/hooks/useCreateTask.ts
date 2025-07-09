import { useCallback } from "react";
import { createTask } from "@/services/task.service";
import { NewTaskInput, Task } from "@/types/task.types";
import { useTaskStore } from "@/stores/taskStore";

export function useCreateTask() {
  const setLoading = useTaskStore((state) => state.setLoading);
  const setError = useTaskStore((state) => state.setError);
  const addTask = useTaskStore((state) => state.addTask);

  const create = useCallback(
    async (data: NewTaskInput): Promise<Task | null> => {
      setLoading("create", true);
      setError("create", null);
      try {
        const task = await createTask(data);
        addTask(task);
        return task;
      } catch {
        setError("create", "Error al crear tarea");
        return null;
      } finally {
        setLoading("create", false);
      }
    },
    [setLoading, setError, addTask]
  );

  return { create };
}
