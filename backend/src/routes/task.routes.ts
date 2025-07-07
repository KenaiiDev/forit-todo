import { Router } from "express";
import {
  createTask,
  deleteTask,
  getAllTasks,
  getCompleted,
  getPending,
  getTaskById,
  //   searchTask,
  toggleTaskStatus,
  updateTask,
} from "@/controllers/task.controller";

const taskRouter: Router = Router();

taskRouter.route("/tasks").get(getAllTasks).post(createTask);
taskRouter.route("/tasks/completed").get(getCompleted);
taskRouter.route("/tasks/pending").get(getPending);
taskRouter.route("/tasks/toggle/:id").patch(toggleTaskStatus);
// taskRouter.route("/tasks/search/:query").get(searchTask);
taskRouter
  .route("/tasks/:id")
  .get(getTaskById)
  .put(updateTask)
  .delete(deleteTask);

export { taskRouter };
