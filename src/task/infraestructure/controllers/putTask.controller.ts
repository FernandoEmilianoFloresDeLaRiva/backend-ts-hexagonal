import { Request, Response } from "express";
import { PutTaskService } from "../../application/services";

export class PutTaskController {
  constructor(private readonly putTaskService: PutTaskService) {}
  async run(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const parseId = parseInt(id);
      const task = req.body;
      const result = await this.putTaskService.run(task, parseId);
      res.status(200).send(result);
    } catch (err: any) {
      return res.status(500).send(err.message);
    }
  }
}
