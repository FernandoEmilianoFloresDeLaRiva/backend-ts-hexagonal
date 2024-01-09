import { Request, Response } from "express";
import { DeleteTaskService } from "../../application/services";

export class DeleteTaskController {
  constructor(private deleteTaskService: DeleteTaskService) {}
  async run(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const parseId = parseInt(id);
      const handleError = await this.deleteTaskService.run(parseId);
      if (handleError === true)
        return res.status(200).json("Delete successfully");
      return res.status(404).json("There was an error deleting the task");
    } catch (err: any) {
      return res.status(500).send(err.message);
    }
  }
}
