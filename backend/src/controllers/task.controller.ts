import { taskService } from "@/services/task.service";
import { httpResponse } from "@/libs/httpResponse";
import type { Request, NextFunction } from "express";
import type { CreateTaskDto, UpdateTaskDto, Task } from "@/types/tasks.types";
import type {
  CustomResponseData,
  CustomResponseMessage,
} from "@/types/response.types";

const createTask = async (
  req: Request<unknown, unknown, CreateTaskDto>,
  res: CustomResponseData<Task>,
  next: NextFunction
) => {
  try {
    const { body } = req;
    const task = await taskService.create(body);
    httpResponse.CREATED(res, task);
  } catch (error) {
    next(error);
  }
};

const getTaskById = async (
  req: Request<{ id: string }>,
  res: CustomResponseMessage | CustomResponseData<Task>,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const task = await taskService.getById(parseInt(id));
    if (!task) {
      httpResponse.NOT_FOUND(res as CustomResponseMessage, "Task not found");
      return;
    }
    httpResponse.OK(res as CustomResponseData<Task>, task);
  } catch (error) {
    next(error);
  }
};

const getAllTasks = async (
  req: Request,
  res: CustomResponseData<Task[]>,
  next: NextFunction
) => {
  try {
    const search = req.query.search as string | undefined;
    const status = req.query.status as
      | "all"
      | "pending"
      | "completed"
      | undefined;

    const tasks = await taskService.getAll(search, status ?? "all");

    httpResponse.OK(res, tasks);
  } catch (error) {
    next(error);
  }
};

const getCompleted = async (
  req: Request,
  res: CustomResponseData<Task[]>,
  next: NextFunction
) => {
  try {
    const tasks = await taskService.getCompleted();
    httpResponse.OK(res, tasks);
  } catch (error) {
    next(error);
  }
};

const getPending = async (
  req: Request,
  res: CustomResponseData<Task[]>,
  next: NextFunction
) => {
  try {
    const tasks = await taskService.getPending();
    httpResponse.OK(res, tasks);
  } catch (error) {
    next(error);
  }
};

const updateTask = async (
  req: Request<{ id: string }, unknown, UpdateTaskDto>,
  res: CustomResponseMessage | CustomResponseData<Task>,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const updatedTask = await taskService.updateTask(parseInt(id), body);
    if (!updatedTask) {
      httpResponse.NOT_FOUND(res as CustomResponseMessage, "Task not found");
      return;
    }
    httpResponse.OK(res as CustomResponseData<Task>, updatedTask);
  } catch (error) {
    next(error);
  }
};

const toggleTaskStatus = async (
  req: Request<{ id: string }, unknown, unknown>,
  res: CustomResponseMessage | CustomResponseData<Task>,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const toggledTask = await taskService.toggleStatus(parseInt(id));
    if (!toggledTask) {
      httpResponse.NOT_FOUND(res as CustomResponseMessage, "Task not found");
      return;
    }
    httpResponse.OK(res as CustomResponseData<Task>, toggledTask);
  } catch (error) {
    next(error);
  }
};

const searchTask = async (
  req: Request<{ query: string }, unknown, unknown>,
  res: CustomResponseData<Task[]>,
  next: NextFunction
) => {
  try {
    const { query } = req.params;
    const tasks = await taskService.searchTask(query);
    httpResponse.OK(res, tasks);
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (
  req: Request<{ id: string }>,
  res: CustomResponseMessage,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const deleted = await taskService.deleteTask(parseInt(id));
    if (!deleted) {
      httpResponse.NOT_FOUND(res, "Task not found");
      return;
    }
    httpResponse.NO_CONTENT(res);
  } catch (error) {
    next(error);
  }
};

export {
  createTask,
  getTaskById,
  getAllTasks,
  getCompleted,
  getPending,
  updateTask,
  toggleTaskStatus,
  searchTask,
  deleteTask,
};
