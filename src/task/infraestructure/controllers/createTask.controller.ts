import { Request, Response } from "express";
import { CreateTaskService } from "../../application/services";
import { createTaskDto } from "../../domain/dtos";

export class CreateTaskController {
  constructor(private readonly createTaskService: CreateTaskService) {}
  async run(req: Request, res: Response) {
    const task = createTaskDto(req.body);
    const result = await this.createTaskService.run(task);
    res.status(201).send(result);
  }
}
