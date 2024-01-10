import { DeleteUserByEmailService } from "../../application/services";
import { Request, Response } from "express";

export class DeleteUserByEmailController {
  constructor(private readonly deleteUserService: DeleteUserByEmailService) {}
  async run(req: Request, res: Response) {
    try {
      const { email } = req.params;
      const handleError = await this.deleteUserService.run(email);
      if (handleError) return res.status(200).json("Delete successfully");
      return res.status(404).json("There was an error deleting the user");
    } catch (err: any) {
      return res.status(500).send(err.message);
    }
  }
}
