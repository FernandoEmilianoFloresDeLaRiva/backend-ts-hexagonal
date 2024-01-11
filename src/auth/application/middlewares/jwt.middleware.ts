import jwt from "jsonwebtoken";;
import { Response, Request, NextFunction } from "express";
import { SECRET_KEY_JWT } from "../../domain/constants";

export const verifyJwt = (req: Request, res: Response, next: NextFunction) => {
  let token = req.get("Authorization");
  if (token) {
    token = token.substring(7);
    jwt.verify(token, SECRET_KEY_JWT, (err, _decodeToken) => {
      if (err) {
        return res.status(401).send({
          message: "Token invalido",
          error: err.message,
        });
      }
      next();
    });
  }
  if (!token) {
    return res.status(401).send({ message: "Token inexistente" });
  }
};
