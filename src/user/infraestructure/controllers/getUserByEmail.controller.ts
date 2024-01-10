import { Request, Response } from "express";
import { GetUserByEmailService } from "../../application/services";

export class GetUserByEmailController {
  constructor(private readonly getUserByIdService: GetUserByEmailService) {}
  async run(req: Request, res: Response) {
    try {
      const { email } = req.params;
      const result = await this.getUserByIdService.run(email);
      if (result.email !== "") return res.status(200).send(result);
      return res.status(404).send(result);
    } catch (err: any) {
      res.status(500).send(err.message);
    }
  }
}
