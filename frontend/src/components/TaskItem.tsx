import type { Task } from "@/types/task.types";
import { BsThreeDots } from "react-icons/bs";
import clsx from "clsx";
import { useToggleTaskStatus } from "@/hooks/useToggleTaskStatus";
import TaskMenu from "./TaskMenu";
import { useDeleteTask } from "@/hooks";
import EditTaskModal from "./EditTaskModal";
import { useTaskStore } from "@/stores/taskStore";
import ViewTaskModal from "./ViewTaskModal";

import { useState } from "react";
type TaskItemParams = {
  data: Task;
};

function formatDateShort(dateString: string): string {
  const date = new Date(dateString);

  const formatter = new Intl.DateTimeFormat("es-AR", {
    month: "short",
    day: "2-digit",
  });

  const formatted = formatter.format(date);
  const [day, month] = formatted.split("-");
  return `${month} ${day}`;
}

const baseToggleClasses =
  "peer shrink-0 rounded-sm border ring-offset-background focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-5 h-5 border-purple-400";

function getToggleButton(completed: boolean, onClick: () => void) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={completed}
      data-state={completed ? "checked" : "unchecked"}
      value="on"
      onClick={onClick}
      className={clsx(
        baseToggleClasses,
        completed &&
          "data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600 data-[state=checked]:text-primary-foreground"
      )}
    >
      {completed && (
        <span
          data-state="checked"
          className="flex items-center justify-center text-current"
          style={{ pointerEvents: "none" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-check h-4 w-4"
          >
            <path d="M20 6 9 17l-5-5"></path>
          </svg>
        </span>
      )}
    </button>
  );
}

export default function TaskItem({ data }: TaskItemParams) {
  const formattedDate = formatDateShort(data.createdAt.toDateString());
  const { toggle } = useToggleTaskStatus();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const handleToggle = () => {
    toggle(data.id);
  };

  const { remove } = useDeleteTask();

  const handleViewDetails = () => {
    setIsViewModalOpen(true);
  };
  const handleEdit = () => {
    setIsEditModalOpen(true);
  };
  const handleDelete = async () => {
    await remove(data.id);
    setIsViewModalOpen(false);
  };

  const containerStyles = clsx(
    "group relative bg-gradient-to-br from-purple-600/20 to-purple-800/20 border-purple-500/30 backdrop-blur-sm border rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/10",
    { "opacity-75": data.completed }
  );

  const titleStyles = clsx(
    "font-bold text-lg mb-3 cursor-pointer transition-colors leading-tight text-white hover:text-purple-300",
    { "line-through": data.completed }
  );

  const toggleButton = getToggleButton(data.completed, handleToggle);

  const tag = data.completed ? (
    <div className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-300 border border-green-500/30">
      Completed
    </div>
  ) : (
    <div className="px-3 py-1 rounded-full text-xs font-medium bg-orange-500/20 text-orange-300 border border-orange-500/30">
      In Progress
    </div>
  );

  return (
    <>
      <div className={containerStyles}>
        <div className="absolute top-4 right-4">{toggleButton}</div>
        <div className="pr-8 pl-2">
          <h3 className={titleStyles}>
            {data.title}
            <BsThreeDots />
          </h3>
          <div className="mb-4">
            <p className="text-sm leading-relaxed text-purple-200/80">
              {data.description}
            </p>
          </div>
          <div className="flex items-center justify-between text-xs text-purple-400/70 mb-4">
            <div className="flex items-center gap-1">
              <span>{formattedDate}</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            {tag}
            <TaskMenu
              onViewDetails={handleViewDetails}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        </div>
      </div>
      <EditTaskModal
        onClose={() => setIsEditModalOpen(false)}
        isOpen={isEditModalOpen}
        task={data}
      />
      <ViewTaskModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        task={data}
        onToggleStatus={handleToggle}
        onDelete={handleDelete}
      />
    </>
  );
}
