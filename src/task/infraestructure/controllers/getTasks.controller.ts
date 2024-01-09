import { Request, Response } from "express";
import { GetTasksService } from "../../application/services";

export class GetTasksController {
  constructor(private readonly GetTasksService: GetTasksService) {}
  async run(req: Request, res: Response) {
    try {
      const result = await this.GetTasksService.run();
      res.status(200).send(result);
    } catch (err: any) {
      return res.status(500).send(err.message);
    }
  }
}
