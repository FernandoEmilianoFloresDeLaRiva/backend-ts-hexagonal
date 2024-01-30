import { Response, Request, NextFunction } from "express";
import { TokenRepository } from "../../domain/repository/TokenRepository";

export class JwtMiddleware {
  constructor(private readonly tokenRepository: TokenRepository) {}
  async run(req: Request, res: Response, next: NextFunction) {
    try {
      let token = req.get("Authorization");
      if (token) {
        token = token.substring(7);
        this.tokenRepository.verifyToken(token);
        next();
      }
      return res.status(401).send({ message: "Token inexistente" });
    } catch (err: any) {
      return res.status(401).send({
        message: "Token invalido",
        error: err.message,
      });
    }
  }
}
