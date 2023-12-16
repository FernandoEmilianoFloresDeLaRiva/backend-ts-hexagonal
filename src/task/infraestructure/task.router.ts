import { Router } from "express";
import {
  getTasksController,
  getTaskByIdController,
  createTaskController,
  deleteTaskController,
  putTaskController,
} from "./dependencies.task";

const taskRouter = Router();

taskRouter
  .get("/", getTasksController.run.bind(getTasksController))
  .get("/:id", getTaskByIdController.run.bind(getTaskByIdController))
  .post("/", createTaskController.run.bind(createTaskController))
  .delete("/:id", deleteTaskController.run.bind(deleteTaskController))
  .put("/:id", putTaskController.run.bind(putTaskController));

export default taskRouter;
