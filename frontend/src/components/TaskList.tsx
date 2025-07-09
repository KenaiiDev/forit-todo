import { Task } from "@/types/task.types";
import TaskItem from "./TaskItem";
import { useTaskStore } from "@/stores/taskStore";

export default function TaskList() {
  const tasks = useTaskStore((state) => state.tasks);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-max">
      {tasks?.map((task) => (
        <TaskItem key={task.id} data={task} />
      ))}
    </div>
  );
}
