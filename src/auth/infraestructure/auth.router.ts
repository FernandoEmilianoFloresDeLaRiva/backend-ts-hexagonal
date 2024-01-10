import { Router } from "express";
import {
  loginAuthController,
  registerAuthController,
} from "./auth.dependencies";

const authRouter = Router();

authRouter
  .post("/", loginAuthController.run.bind(loginAuthController))
  .post("/register", registerAuthController.run.bind(registerAuthController));

export default authRouter;
