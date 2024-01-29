import { Response, Request } from "express";
import { GetByIdService } from "../../application/services/getById.service";

export class GetByIdController {
  constructor(private readonly getByIdService: GetByIdService) {}
  async run(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const parseId = parseInt(id, 10);
      const result = await this.getByIdService.run(parseId);
      return res.status(200).json(result);
    } catch (err: any) {
      res.status(500).send(err.message);
    }
  }
}
