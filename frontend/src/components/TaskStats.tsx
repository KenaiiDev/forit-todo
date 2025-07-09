import type { Task } from "@/types/task.types";

type TaskStatsParams = {
  tasks: Task[];
  loading?: boolean;
  error?: string | null;
};

function getTasksStats(tasks: Task[]) {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const pending = total - completed;
  const percentComplete =
    total === 0 ? 0 : Math.round((completed / total) * 100);

  return {
    total,
    pending,
    completed,
    percentComplete,
  };
}

export default function TaskStats({ tasks, loading, error }: TaskStatsParams) {
  const { pending, completed, percentComplete } = getTasksStats(tasks);

  if (loading) return null;
  if (error) return null;

  return (
    <div className="flex items-center w-full gap-6">
      <div className="flex items-center gap-2 px-4 py-2 bg-purple-800/30 rounded-full backdrop-blur-sm border border-purple-500/20">
        <span className="text-sm text-purple-200">{pending} Active</span>
      </div>
      <div className="flex items-center gap-2 px-4 py-2 bg-green-800/30 rounded-full backdrop-blur-sm border border-green-500/20">
        <span className="text-sm text-green-200">{completed} Done</span>
      </div>
      <div className="flex items-center gap-2 px-4 py-2 bg-indigo-800/30 rounded-full backdrop-blur-sm border border-indigo-500/20">
        <span className="text-sm text-indigo-200">
          {percentComplete}% Complete
        </span>
      </div>
    </div>
  );
}
