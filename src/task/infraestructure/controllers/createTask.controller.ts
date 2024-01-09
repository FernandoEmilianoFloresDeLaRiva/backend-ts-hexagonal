import { Request, Response } from "express";
import { CreateTaskService } from "../../application/services";

export class CreateTaskController {
  constructor(private readonly createTaskService: CreateTaskService) {}
  async run(req: Request, res: Response) {
    try {
      const task = req.body;
      const result = await this.createTaskService.run(task);
      res.status(201).send(result);
    } catch (err: any) {
      return res.status(500).send(err.message);
    }
  }
}
