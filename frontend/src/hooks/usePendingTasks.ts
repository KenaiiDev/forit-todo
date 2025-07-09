import { useEffect } from "react";
import { getPendingTasks } from "@/services/task.service";
import { useTaskStore } from "@/stores/taskStore";

export function usePendingTasks() {
  const setTasks = useTaskStore((state) => state.setTasks);
  const setError = useTaskStore((state) => state.setError);
  const setLoading = useTaskStore((state) => state.setLoading);

  useEffect(() => {
    setLoading("fetch", true);
    setError("fetch", null);
    getPendingTasks()
      .then((tasks) => setTasks(tasks))
      .catch(() => setError("fetch", "Error al obtener tareas pendientes"))
      .finally(() => setLoading("fetch", false));
  }, [setTasks, setError, setLoading]);
}
