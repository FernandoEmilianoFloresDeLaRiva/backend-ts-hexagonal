import { Request, Response } from "express";
import { GetTaskByIdService } from "../../application/services";

export class GetTaskByIdController {
  constructor(private readonly getTaskByIdService: GetTaskByIdService) {}
  async run(req: Request, res: Response) {
    const { id } = req.params;
    const parseId = parseInt(id);
    const result = await this.getTaskByIdService.run(parseId);
    res.status(200).send(result);
  }
}
