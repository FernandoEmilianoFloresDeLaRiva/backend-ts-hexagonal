import { Request, Response } from "express";
import { DeleteTaskService } from "../../application/services";

export class DeleteTaskController {
  constructor(private deleteTaskService: DeleteTaskService) {}
  async run(req: Request, res: Response) {
    const { id } = req.params;
    const parseId = parseInt(id);
    const response = await this.deleteTaskService.run(parseId);
    return res.status(200).json(response);
  }
}
