import { Request, Response } from "express";
import { UpdateUserByIdService } from "../../application/services";

export class UpdateUserByIdController {
  constructor(private readonly updateUserByIdService: UpdateUserByIdService) {}
  async run(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const parseId = parseInt(id);
      const user = req.body;
      const result = await this.updateUserByIdService.run(user, parseId);
      return res.status(200).json(result);
    } catch (err: any) {
      res.status(500).send(err.message);
    }
  }
}
