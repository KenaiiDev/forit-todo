"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCreateTask } from "@/hooks";
import { NewTaskInput } from "@/types/task.types";
import clsx from "clsx";
import { useTaskStore } from "@/stores/taskStore";

const schema = z.object({
  title: z.string().min(1, "El título es obligatorio"),
  description: z.string().min(1, "La descripción es obligatoria"),
});

type FormValues = z.infer<typeof schema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddTaskModal({ isOpen, onClose }: Props) {
  const { create } = useCreateTask();
  const loading = useTaskStore((state) => state.loading);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: NewTaskInput) => {
    const created = await create(data);
    if (!created) return setError("No se pudo crear la tarea");
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 text-white rounded-xl p-6 w-full max-w-md shadow-2xl border border-purple-500/20">
        <h2 className="text-xl font-semibold mb-4 text-purple-300">
          Nueva Tarea
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              {...register("title")}
              placeholder="Título"
              className={clsx(
                "w-full px-4 py-2 rounded bg-slate-800 border border-purple-500/30",
                errors.title && "border-red-500"
              )}
            />
            {errors.title && (
              <p className="text-sm text-red-400 mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <textarea
              {...register("description")}
              placeholder="Descripción"
              className={clsx(
                "w-full px-4 py-2 rounded bg-slate-800 border border-purple-500/30 resize-none",
                errors.description && "border-red-500"
              )}
              rows={4}
            />
            {errors.description && (
              <p className="text-sm text-red-400 mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="text-purple-300 hover:underline"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading.create}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md disabled:opacity-50"
            >
              {loading.create ? "Guardando..." : "Guardar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
