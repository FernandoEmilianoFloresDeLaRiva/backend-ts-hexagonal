import { Response, Request, NextFunction } from "express";
import { isCorrectJwt } from "../utils";

export const verifyJwt = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let token = req.get("Authorization");
    if (token) {
      token = token.substring(7);
      isCorrectJwt(token);
      next();
    }
    return res.status(401).send({ message: "Token inexistente" });
  } catch (err: any) {
    return res.status(401).send({
      message: "Token invalido",
      error: err.message,
    });
  }
};
