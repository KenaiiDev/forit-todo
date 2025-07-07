import prismaClient from "@/libs/prismaClient";
import { CreateTaskDto, TaskId, UpdateTaskDto } from "@/types/tasks.types";

export const taskService = {
  create: async (data: CreateTaskDto) => {
    return await prismaClient.task.create({
      data,
    });
  },

  getAll: async () => {
    return await prismaClient.task.findMany({});
  },

  getById: async (id: TaskId) => {
    return await prismaClient.task.findUnique({
      where: {
        id,
      },
    });
  },

  getCompleted: async () => {
    return await prismaClient.task.findMany({
      where: {
        completed: true,
      },
    });
  },

  getPending: async () => {
    return await prismaClient.task.findMany({
      where: {
        completed: false,
      },
    });
  },

  updateTask: async (id: TaskId, data: UpdateTaskDto) => {
    return prismaClient.task.update({
      where: {
        id,
      },
      data,
    });
  },

  toggleStatus: async (id: TaskId) => {
    const task = await prismaClient.task.findUnique({ where: { id } });
    if (!task) throw new Error("Task not found");

    return prismaClient.task.update({
      where: { id },
      data: {
        completed: !task.completed,
      },
    });
  },

  searchTask: async (query: string) => {
    return prismaClient.task.findMany({
      where: {
        title: {
          contains: query,
        },
      },
    });
  },

  deleteTask: async (id: TaskId) => {
    return await prismaClient.task.delete({
      where: {
        id,
      },
    });
  },
};
