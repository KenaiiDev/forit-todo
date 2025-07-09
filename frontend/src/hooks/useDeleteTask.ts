import { useCallback } from "react";
import { deleteTask } from "@/services/task.service";
import { useTaskStore } from "@/stores/taskStore";

export function useDeleteTask() {
  const setLoading = useTaskStore((state) => state.setLoading);
  const setError = useTaskStore((state) => state.setError);
  const removeTask = useTaskStore((state) => state.removeTask);

  const remove = useCallback(
    async (id: number): Promise<boolean> => {
      setLoading("delete", true);
      setError("delete", null);
      try {
        await deleteTask(id);
        removeTask(id);
        return true;
      } catch {
        setError("delete", "Error al eliminar tarea");
        return false;
      } finally {
        setLoading("delete", false);
      }
    },
    [setLoading, setError, removeTask]
  );

  return { remove };
}
