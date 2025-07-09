import { Task } from "@/types/task.types";
import clsx from "clsx";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  task: Task | null;
  onToggleStatus: () => void;
  onDelete: () => void;
}

export default function ViewTaskModal({
  isOpen,
  onClose,
  task,
  onToggleStatus,
  onDelete,
}: Props) {
  if (!isOpen || !task) return null;

  const statusLabel = task.completed ? "Completada" : "En progreso";
  const statusColor = task.completed
    ? "bg-green-500/20 text-green-300 border-green-500/30"
    : "bg-orange-500/20 text-orange-300 border-orange-500/30";

  const formattedDate = new Date(task.createdAt).toLocaleString("es-AR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 text-white rounded-xl p-6 w-full max-w-md shadow-2xl border border-purple-500/20">
        <h2 className="text-xl font-semibold mb-4 text-purple-300">
          Detalles de la Tarea
        </h2>
        <div className="space-y-2 mb-4">
          <div>
            <span className="font-semibold text-purple-400">ID:</span>{" "}
            <span className="text-purple-200">{task.id}</span>
          </div>
          <div>
            <span className="font-semibold text-purple-400">Título:</span>{" "}
            <span className="text-purple-200">{task.title}</span>
          </div>
          <div>
            <span className="font-semibold text-purple-400">Descripción:</span>
            <div className="text-purple-200 whitespace-pre-line">
              {task.description}
            </div>
          </div>
          <div>
            <span className="font-semibold text-purple-400">Estado:</span>{" "}
            <span
              className={clsx(
                "px-3 py-1 rounded-full text-xs font-medium border",
                statusColor
              )}
            >
              {statusLabel}
            </span>
          </div>
          <div>
            <span className="font-semibold text-purple-400">Creada:</span>{" "}
            <span className="text-purple-200">{formattedDate}</span>
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <button
            type="button"
            onClick={onToggleStatus}
            className={clsx(
              "px-4 py-2 rounded-md font-medium",
              task.completed
                ? "bg-orange-600 hover:bg-orange-700 text-white"
                : "bg-green-600 hover:bg-green-700 text-white"
            )}
          >
            {task.completed
              ? "Marcar como pendiente"
              : "Marcar como completada"}
          </button>
          <button
            type="button"
            onClick={onDelete}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
          >
            Eliminar
          </button>
          <button
            type="button"
            onClick={onClose}
            className="text-purple-300 hover:underline"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
