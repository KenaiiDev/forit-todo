import { create } from "zustand";
import type { Task } from "@/types/task.types";

type TaskStore = {
  tasks: Task[];
  isAddModalOpen: boolean;
  error: {
    fetch: string | null;
    create: string | null;
    update: string | null;
    delete: string | null;
  };
  loading: {
    fetch: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
  };
  closeAddModal: () => void;
  openAddModal: () => void;
  setTasks: (tasks: Task[]) => void;
  addTask: (task: Task) => void;
  removeTask: (id: number) => void;
  updateTask: (id: number, data: Partial<Omit<Task, "id">>) => void;
  toggleTask: (id: number) => void;
  setError: (type: keyof TaskStore["error"], value: string | null) => void;
  setLoading: (type: keyof TaskStore["loading"], value: boolean) => void;
};

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  isAddModalOpen: false,
  error: {
    fetch: null,
    create: null,
    update: null,
    delete: null,
  },
  loading: {
    fetch: false,
    create: false,
    update: false,
    delete: false,
  },

  closeAddModal: () =>
    set((state) => ({
      isAddModalOpen: false,
    })),

  openAddModal: () =>
    set((state) => ({
      isAddModalOpen: true,
    })),

  setTasks: (tasks) => set({ tasks }),

  addTask: (task) =>
    set((state) => ({
      tasks: [...state.tasks, task],
    })),

  removeTask: (id: number) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    })),

  updateTask: (id, data) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, ...data } : task
      ),
    })),

  toggleTask: (id) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      ),
    })),

  setError: (type, value) =>
    set((state) => ({
      error: { ...state.error, [type]: value },
    })),

  setLoading: (type, value) =>
    set((state) => ({
      loading: { ...state.loading, [type]: value },
    })),
}));
