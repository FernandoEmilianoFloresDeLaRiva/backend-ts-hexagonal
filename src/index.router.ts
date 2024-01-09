import { Router, Request, Response } from "express";

import taskRouter from "./task/infraestructure/task.router";
import userRouter from "./user/infraestructure/user.router";

const prefijo = "/api";
const indexRouter = Router();

indexRouter.use(`${prefijo}/tasks`, taskRouter);
indexRouter.use(`${prefijo}/users`, userRouter);

indexRouter.get(prefijo, (req: Request, res: Response) => {
  res.status(200).send("Hello World");
});

export default indexRouter;
