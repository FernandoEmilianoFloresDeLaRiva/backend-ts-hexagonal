import { DeleteUserByIdService } from "../../application/services";
import { Request, Response } from "express";

export class DeleteUserByIdController {
  constructor(private readonly deleteUserService: DeleteUserByIdService) {}
  async run(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const parseId = parseInt(id);
      const handleError = await this.deleteUserService.run(parseId);
      if (handleError) return res.status(200).json("Delete successfully");
      return res.status(404).json("There was an error deleting the user");
    } catch (err: any) {
      return res.status(500).send(err.message);
    }
  }
}
