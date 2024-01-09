import { Request, Response } from "express";
import { GetAllUsersService } from "../../application/services";

export class GetAllUsersController {
  constructor(private readonly getAllUsersService: GetAllUsersService) {}
  async run(_req: Request, res: Response) {
    try {
      const result = await this.getAllUsersService.run();
      return res.status(200).json(result);
    } catch (err: any) {
      res.status(500).send(err.message);
    }
  }
}
