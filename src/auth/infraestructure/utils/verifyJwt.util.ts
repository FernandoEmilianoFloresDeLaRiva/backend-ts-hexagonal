import { SECRET_KEY_JWT } from "../../domain/constants";
import jwt from "jsonwebtoken";

export const isCorrectJwt = (token: string): void => {
  jwt.verify(token, SECRET_KEY_JWT, (err, _decodeToken) => {
    if (err) {
      throw new Error(err.message);
    }
  });
};
