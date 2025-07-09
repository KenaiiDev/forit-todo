import { useEffect } from "react";
import { getCompletedTasks } from "@/services/task.service";
import { useTaskStore } from "@/stores/taskStore";

export function useCompletedTasks() {
  const setTasks = useTaskStore((state) => state.setTasks);
  const setError = useTaskStore((state) => state.setError);
  const setLoading = useTaskStore((state) => state.setLoading);

  useEffect(() => {
    setLoading("fetch", true);
    setError("fetch", null);
    getCompletedTasks()
      .then((tasks) => setTasks(tasks))
      .catch(() => setError("fetch", "Error al obtener tareas completadas"))
      .finally(() => setLoading("fetch", false));
  }, [setTasks, setError, setLoading]);
}
