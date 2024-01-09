import { Request, Response } from "express";
import { GetUserByIdService } from "../../application/services";

export class GetUserByIdController {
  constructor(private readonly getUserByIdService: GetUserByIdService) {}
  async run(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const parseId = parseInt(id);
      const result = await this.getUserByIdService.run(parseId);
      if (result.email !== "") return res.status(200).send(result);
      return res.status(404).send(result);
    } catch (err: any) {
      res.status(500).send(err.message);
    }
  }
}
