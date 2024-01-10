import { Request, Response } from "express";
import { LoginAuthService } from "../../application/services";

export class LoginAuthController {
  constructor(private readonly loginAuthService: LoginAuthService) {}
  async run(req: Request, res: Response) {
    try {
      const userCredentials = req.body;
      const jwtResult = await this.loginAuthService.run(userCredentials);
      res.status(200).json(jwtResult);
    } catch (err: any) {
      return res.status(500).send(err.message);
    }
  }
}
