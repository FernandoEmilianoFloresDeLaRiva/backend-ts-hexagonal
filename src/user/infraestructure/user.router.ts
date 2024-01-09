import { Router } from "express";
import {
  deleteUserByIdController,
  getAllUsersController,
  getUserByIdController,
  updateUserByIdController,
} from "./dependencies.user";

const userRouter = Router();

userRouter
  .get("/", getAllUsersController.run.bind(getAllUsersController))
  .get("/:id", getUserByIdController.run.bind(getUserByIdController))
  .delete("/:id", deleteUserByIdController.run.bind(deleteUserByIdController))
  .put("/:id", updateUserByIdController.run.bind(updateUserByIdController));

export default userRouter;
