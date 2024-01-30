import { Router } from "express";
import {
  deleteUserByEmailController,
  getAllUsersController,
  getUserByEmailController,
  updateUserByEmailController,
  getByIdController,
  jwtMiddleware,
} from "./dependencies.user";

const userRouter = Router();

userRouter
  .get("/:id", getByIdController.run.bind(getByIdController))
  .get(
    "/",
    jwtMiddleware.run.bind(jwtMiddleware),
    getAllUsersController.run.bind(getAllUsersController)
  )
  .get(
    "/:email",
    jwtMiddleware.run.bind(jwtMiddleware),
    getUserByEmailController.run.bind(getUserByEmailController)
  )
  .delete(
    "/:email",
    jwtMiddleware.run.bind(jwtMiddleware),
    deleteUserByEmailController.run.bind(deleteUserByEmailController)
  )
  .put(
    "/:email",
    jwtMiddleware.run.bind(jwtMiddleware),
    updateUserByEmailController.run.bind(updateUserByEmailController)
  );

export default userRouter;
