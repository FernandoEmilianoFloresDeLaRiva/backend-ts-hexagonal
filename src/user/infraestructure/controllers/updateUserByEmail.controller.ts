import { Request, Response } from "express";
import { UpdateUserByEmailService } from "../../application/services";

export class UpdateUserByEmailController {
  constructor(private readonly updateUserByIdService: UpdateUserByEmailService) {}
  async run(req: Request, res: Response) {
    try {
      const { email } = req.params;
      const user = req.body;
      const result = await this.updateUserByIdService.run(user, email);
      return res.status(200).json(result);
    } catch (err: any) {
      res.status(500).send(err.message);
    }
  }
}
