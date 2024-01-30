import { Router } from "express";
import {
  getTasksController,
  getTaskByIdController,
  createTaskController,
  deleteTaskController,
  putTaskController,
  jwtMiddleware,
} from "./dependencies.task";

const taskRouter = Router();

taskRouter
  .get(
    "/",
    jwtMiddleware.run.bind(jwtMiddleware),
    getTasksController.run.bind(getTasksController)
  )
  .get(
    "/:id",
    jwtMiddleware.run.bind(jwtMiddleware),
    getTaskByIdController.run.bind(getTaskByIdController)
  )
  .post(
    "/",
    jwtMiddleware.run.bind(jwtMiddleware),
    createTaskController.run.bind(createTaskController)
  )
  .delete("/:id", deleteTaskController.run.bind(deleteTaskController))
  .put("/:id", putTaskController.run.bind(putTaskController));

export default taskRouter;
