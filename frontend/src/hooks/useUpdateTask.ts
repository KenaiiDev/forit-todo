import { useCallback } from "react";
import { updateTask } from "@/services/task.service";
import { UpdateTaskInput, Task } from "@/types/task.types";
import { useTaskStore } from "@/stores/taskStore";

export function useUpdateTask() {
  const setLoading = useTaskStore((state) => state.setLoading);
  const loading = useTaskStore((state) => state.loading.update);
  const setError = useTaskStore((state) => state.setError);
  const updateTaskInStore = useTaskStore((state) => state.updateTask);

  const update = useCallback(
    async (id: number, data: UpdateTaskInput): Promise<Task | null> => {
      setLoading("update", true);
      setError("update", null);
      try {
        const updated = await updateTask(id, data);
        if (updated) {
          updateTaskInStore(id, data);
        }
        return updated;
      } catch {
        setError("update", "Error al actualizar tarea");
        return null;
      } finally {
        setLoading("update", false);
      }
    },
    [setLoading, setError]
  );

  return { update, loading };
}
