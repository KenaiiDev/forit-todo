"use client";
import { useState } from "react";

import { useCompletedTasks, usePendingTasks, useTasks } from "@/hooks";
import { useTaskStore } from "@/stores/taskStore";
import CreateButton from "@/components/CreateButton";
import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import TaskList from "@/components/TaskList";
import TaskStats from "@/components/TaskStats";
import AddTaskModal from "@/components/AddTaskModal";

export default function Home() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "pending" | "completed">("all");

  useTasks(search, filter);

  const tasks = useTaskStore((state) => state.tasks);
  const error = useTaskStore((state) => state.error.fetch);
  const loading = useTaskStore((state) => state.loading.fetch);
  const isAddModalOpen = useTaskStore((state) => state.isAddModalOpen);
  const closeModal = useTaskStore((state) => state.closeAddModal);
  const openModal = useTaskStore((state) => state.openAddModal);

  return (
    <>
      <Navbar filter={filter} setFilter={setFilter} />
      <AddTaskModal isOpen={isAddModalOpen} onClose={closeModal} />
      <div className="min-h-screen pt-20 md:pt-0 md:pl-20 bg-gradient-to-br from-indigo-950 via-purple-950 to-pink-950 relative overflow-hidden transition-all duration-300">
        <header className="relative z-10 p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center w-full gap-4">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-300 via-pink-300 to-indigo-300 bg-clip-text text-transparent">
                  TaskList
                </h1>
                <p className="text-purple-300/70 mt-1">
                  Organiza tu tiempo, una tarea a la vez
                </p>
              </div>
            </div>
            <TaskStats tasks={tasks} error={error} loading={loading} />
          </div>
          <SearchBar
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </header>
        <main className="px-6 pb-6">
          <TaskList />
        </main>
        <CreateButton onOpen={openModal} />
      </div>
    </>
  );
}
