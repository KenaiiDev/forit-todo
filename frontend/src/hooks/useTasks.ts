import { useEffect } from "react";
import {
  getTasks,
  getPendingTasks,
  getCompletedTasks,
} from "@/services/task.service";
import { useTaskStore } from "@/stores/taskStore";

export function useTasks(
  search: string,
  filter: "all" | "pending" | "completed"
) {
  const setTasks = useTaskStore((state) => state.setTasks);
  const setError = useTaskStore((state) => state.setError);
  const setLoading = useTaskStore((state) => state.setLoading);

  useEffect(() => {
    setLoading("fetch", true);
    setError("fetch", null);

    getTasks(search, filter)
      .then((tasks) => setTasks(tasks))
      .catch(() => setError("fetch", "Error al obtener tareas"))
      .finally(() => setLoading("fetch", false));
  }, [search, filter, setTasks, setError, setLoading]);
}
