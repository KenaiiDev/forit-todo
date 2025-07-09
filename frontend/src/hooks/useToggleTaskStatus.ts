import { useCallback } from "react";
import { toggleTaskStatus } from "@/services/task.service";
import { useTaskStore } from "@/stores/taskStore";
import { Task } from "@/types/task.types";

export function useToggleTaskStatus() {
  const setLoading = useTaskStore((state) => state.setLoading);
  const setError = useTaskStore((state) => state.setError);
  const toggleTask = useTaskStore((state) => state.toggleTask);

  const toggle = useCallback(
    async (id: number): Promise<Task | null> => {
      setLoading("update", true);
      setError("update", null);
      try {
        const updatedTask = await toggleTaskStatus(id);
        toggleTask(id);
        return updatedTask;
      } catch {
        setError("update", "Error al actualizar tarea");
        return null;
      } finally {
        setLoading("update", false);
      }
    },
    [setLoading, setError, toggleTask]
  );

  return { toggle };
}
