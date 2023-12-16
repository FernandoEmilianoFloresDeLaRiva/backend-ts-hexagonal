import { Request, Response } from "express";
import { GetTasksService } from "../../application/services";

export class GetTasksController {
  constructor(private readonly GetTasksService: GetTasksService) {}
  async run(req: Request, res: Response) {
    const result = await this.GetTasksService.run();
    res.status(200).send(result);
  }
}
