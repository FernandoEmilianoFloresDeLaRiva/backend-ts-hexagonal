import { Request, Response } from "express";
import { PutTaskService } from "../../application/services";

export class PutTaskController {
  constructor(private readonly putTaskService: PutTaskService) {}
  async run(req: Request, res: Response) {
    const { id } = req.params;
    const parseId = parseInt(id);
    const task = req.body;
    const result = await this.putTaskService.run(task, parseId);
    res.status(200).send(result);
  }
}
