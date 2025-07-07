import { Router } from "express";
import {
  createTask,
  deleteTask,
  getAllTasks,
  getCompleted,
  getPending,
  getTaskById,
  toggleTaskStatus,
  updateTask,
} from "@/controllers/task.controller";

import { validate } from "@/middlewares/validate";
import {
  createTaskSchema,
  idTaskSchema,
  updateTaskSchema,
  // taskBodySchema,
  // taskParamsSchema,
} from "@/schemas/task.schemas";

const taskRouter: Router = Router();

taskRouter
  .route("/tasks")
  .get(getAllTasks)
  .post(validate(createTaskSchema), createTask);

taskRouter.route("/tasks/completed").get(getCompleted);
taskRouter.route("/tasks/pending").get(getPending);
taskRouter
  .route("/tasks/toggle/:id")
  .patch(validate(idTaskSchema), toggleTaskStatus);
taskRouter
  .route("/tasks/:id")
  .get(validate(idTaskSchema), getTaskById)
  .put(validate(updateTaskSchema), updateTask)
  .delete(validate(idTaskSchema), deleteTask);

export { taskRouter };
