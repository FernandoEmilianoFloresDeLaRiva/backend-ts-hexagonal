import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Response, Request, NextFunction } from "express";
dotenv.config();

export const verificarJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const secretWord = process.env.JWTSECRET || "123455";
  //Consigue el token de la cabecera "Authorization"
  let token = req.get("Authorization");
  if (token) {
    //Se saca la palabra "Bearer", se usa como esquema y se deja el puro token
    token = token.substring(7);
    //Compara el token
    jwt.verify(token, secretWord, (err, _decodeToken) => {
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
